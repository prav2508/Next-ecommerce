package com.basic.backend;

import java.io.Serializable;

public class AddItemToCartModel implements Serializable{

	private int cart_id;
	
	private int item_id;
	
	private String jwt;
	
	

	public String getJwt() {
		return jwt;
	}

	public void setJwt(String jwt) {
		this.jwt = jwt;
	}

	public int getCart_id() {
		return cart_id;
	}

	public void setCart_id(int cart_id) {
		this.cart_id = cart_id;
	}

	public int getItem_id() {
		return item_id;
	}

	public void setItem_id(int item_id) {
		this.item_id = item_id;
	}
	
	
}
