package com.basic.backend;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartDaoRepository extends JpaRepository<Cart, Integer>{

	Cart findById(int id) ;
	
	
}
