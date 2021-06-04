package com.basic.backend;

import java.io.Serializable;

public class CheckoutCartModel implements Serializable{

	private String jwt;

	public String getJwt() {
		return jwt;
	}

	public void setJwt(String jwt) {
		this.jwt = jwt;
	}
	
	
}
