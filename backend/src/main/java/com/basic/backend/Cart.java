package com.basic.backend;

import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;

import org.springframework.stereotype.Component;

@Component
@Entity
public class Cart {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
//	@OneToOne(cascade = CascadeType.ALL)
//	private Users user;
	
	@ManyToMany
	private List<Item> item;
	

	private boolean is_purchased;
	
	private Date created_at;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

//	public Users getUser() {
//		return user;
//	}

//	public void setUser(Users user) {
//		this.user = user;
//	}
	public List<Item> getItem() {
		return item;
	}

	public void setItem(List<Item> item) {
		this.item = item;
	}
	public boolean isIs_purchased() {
		return is_purchased;
	}

	public void setIs_purchased(boolean is_purchased) {
		this.is_purchased = is_purchased;
	}

	public Date getCreated_at() {
		return created_at;
	}

	public void setCreated_at(Date created_at) {
		this.created_at = created_at;
	}

	@Override
	public String toString() {
		return "Cart [id=" + id + ", is_purchased=" + is_purchased + ", created_at=" + created_at
				+ "]";
	}
	
	
}
