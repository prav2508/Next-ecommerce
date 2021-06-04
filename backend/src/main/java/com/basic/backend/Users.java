package com.basic.backend;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import org.springframework.stereotype.Component;

@Component
@Entity
public class Users {

	public Users() {
		super();
	}

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	private String name;
	
	private String username;
	
	private String password;
	
	private String jwt_token;
	
	@OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cart_id", referencedColumnName = "id")
	private Cart cart;
	
	private Date created_at;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getJwt_token() {
		return jwt_token;
	}

	public void setJwt_token(String jwt_token) {
		this.jwt_token = jwt_token;
	}

	public Cart getCart() {
		return cart;
	}

	public void setCart(Cart cart) {
		this.cart = cart;
	}

	public Date getCreated_at() {
		return created_at;
	}

	public void setCreated_at(Date created_at) {
		this.created_at = created_at;
	}

	@Override
	public String toString() {
		return "Users [id=" + id + ", name=" + name + ", username=" + username + ", password=" + password
				+ ", jwt_token=" + jwt_token + ", created_at=" + created_at + "]";
	}
	
	
}
