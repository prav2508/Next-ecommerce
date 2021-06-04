package com.basic.backend;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.persistence.criteria.Order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class Controller {


	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtUtil jwtTokenUtil;

	@Autowired
	private CustomUserDetailsService userDetailsService;

	@Autowired
	private UserDaoRepository userdao;
	
	@Autowired
	private Users newuser;
	
	@Autowired
	private CartDaoRepository cartdao;
	
	@Autowired
	private Cart cart;
	
		
	@Autowired
	private ItemDaoRepository itemdao;
	
	@Autowired
	private Orders order;
	
	@Autowired
	private OrderDaoRepository orderdao;
	
	@Autowired
	private JwtUtil jwtutil;
	
	@RequestMapping({ "/health_check" })
	public ResponseEntity<?> firstPage() {
		return ResponseEntity.ok("server is up!!");
	}
	
	@CrossOrigin
	@RequestMapping(value = "/user/login", method = RequestMethod.POST)
	public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {

		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
			);
		}
		catch (BadCredentialsException e) {
			throw new Exception("Incorrect username or password", e);
		}


		final UserDetails userDetails = userDetailsService
				.loadUserByUsername(authenticationRequest.getUsername());

		final String jwt = jwtTokenUtil.generateToken(userDetails);
		
		Users user = userdao.findByUsername(authenticationRequest.getUsername());
		user.setJwt_token(jwt);
		userdao.save(user);

		return ResponseEntity.ok(user);
	}

	@CrossOrigin
	@PostMapping("/user/create")
	
	public ResponseEntity<?> createNewUser(@RequestBody NewUserModel new_user){
		
		newuser.setName(new_user.getName());
		newuser.setUsername(new_user.getUsername());
		newuser.setPassword(new_user.getPassword());
		newuser.setCreated_at(new Date());
		
		cart.setCreated_at(new Date());
		cart.setIs_purchased(false);
		//cart.setUser(newuser);
		cartdao.save(cart);
		
		newuser.setCart(cart);
		
		userdao.save(newuser);
		
		
		return ResponseEntity.ok("Registeration successful");
		
	}
	
	@CrossOrigin
	@PostMapping("/item/create")
	public ResponseEntity<?> createItem(@RequestBody AddnewItemModel new_item){
		
		Item item = new Item();
		
		item.setName(new_item.getName());
		item.setPrice(new_item.getPrice());
		item.setUrl(new_item.getUrl());
		
		item.setCreated_at(new Date());
		
		itemdao.save(item);
		
		return ResponseEntity.ok(new_item);
	}
	
	
	@CrossOrigin
	@GetMapping("/user/list")
	public ResponseEntity<?> getAllUsers(){
		
		List<Users> users_list= userdao.findAll();
	
		return ResponseEntity.ok(users_list);
	}
	
	@CrossOrigin
	@GetMapping("/item/list")
	public ResponseEntity<?> getAllItems(){
		
		List<Item> item_list= itemdao.findAll();
	
		return ResponseEntity.ok(item_list);
	}
	
	@GetMapping("/cart/list")
	public ResponseEntity<?> getAllCartList(){
		
		List<Cart> cart_list= cartdao.findAll();
	
		return ResponseEntity.ok(cart_list);
	}
	
	@GetMapping("/order/list")
	public ResponseEntity<?> getAllUsersOrderList(){
		
		List<Orders> orders_list= orderdao.findAll();
	
		return ResponseEntity.ok(orders_list);
	}
	
	
	@PostMapping("/cart/add")
	public ResponseEntity<?> addItemstoCart(@RequestBody AddItemToCartModel cart_items){
		
	String jwt_Access_string = cart_items.getJwt();
	
	Users user = userdao.findByUsername(jwtutil.extractUsername(jwt_Access_string));
	
	
	Cart ucart = cartdao.findById(cart_items.getCart_id());
	
	Item uitem = itemdao.findById(cart_items.getItem_id());
	
	List<Item> cartitems = ucart.getItem();
	cartitems.add(uitem);
	
	ucart.setItem(cartitems);
	
	cartdao.save(ucart);

		
		return ResponseEntity.ok(ucart);
		
	}
	
	
	@GetMapping("/cart/{cart_id}/complete")
	
	public ResponseEntity<?> checkoutacart(@PathVariable("cart_id") int cart_id,@RequestBody CheckoutCartModel checkout_cart_model){
		
		
		
		Cart checkout_cart = cartdao.findById(cart_id);
		Users orderplaceuser = userdao.findByUsername(jwtutil.extractUsername(checkout_cart_model.getJwt()));
		
		Orders placeorder = new Orders();
		
		checkout_cart.setIs_purchased(true);
		
		placeorder.setCart(checkout_cart);
		placeorder.setUser(orderplaceuser);
		placeorder.setCreated_at(new Date());
		
		
		orderdao.save(placeorder);
		
		Cart newcart = new Cart();
		
		newcart.setCreated_at(new Date());
		newcart.setIs_purchased(false);
		newcart.setItem(null);
		
	orderplaceuser.setCart(newcart);
	
	userdao.save(orderplaceuser);
		
		return ResponseEntity.ok(placeorder);
	}
	
	
	
	
	
}




