package com.basic.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDaoRepository extends JpaRepository<Users, Integer>{
	
	Users findByUsername(String s);



}
