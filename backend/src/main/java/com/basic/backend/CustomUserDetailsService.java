package com.basic.backend;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService{
	
	@Autowired
	private UserDaoRepository users_dao;
	
	@Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
       Users user = users_dao.findByUsername(username);
       
		return new User(user.getUsername(), user.getPassword(),
                new ArrayList<>());
    }
}
