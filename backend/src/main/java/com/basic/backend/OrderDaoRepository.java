package com.basic.backend;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDaoRepository extends JpaRepository<Orders, Integer>{
	
	@Query(
			  value = "SELECT * FROM orders o WHERE o.user_id = ?1", 
			  nativeQuery = true)
	List<Orders>  findUserOrder(int id);
}
