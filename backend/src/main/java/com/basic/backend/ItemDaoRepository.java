package com.basic.backend;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemDaoRepository extends JpaRepository<Item, Integer>{


	Item findById(int id) ;
		
}
