package com.basic.backend;

import java.io.Serializable;

public class AddnewItemModel implements Serializable{

	private String name;
	
	private String url;
	
	private Float price;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Float getPrice() {
		return price;
	}

	public void setPrice(Float price) {
		this.price = price;
	}

	
	
}
