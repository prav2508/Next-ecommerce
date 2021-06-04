package com.basic.backend;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDaoRepository extends JpaRepository<Orders, Integer>{

}
