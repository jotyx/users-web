package com.msusers.config;

import com.msusers.config.AuthenticationEntryPoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    DataSource dataSource;

    @Autowired
	private AuthenticationEntryPoint authEntryPoint;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .antMatchers("/secured/**").authenticated()
                .anyRequest().permitAll()
                .and()
                .csrf().disable()
            // .formLogin()
            //     .loginPage("/login")
            //     .permitAll()
            //     .and()
            .logout()
                .permitAll();
            http.httpBasic().authenticationEntryPoint(authEntryPoint);
    }

    @Autowired
	public void configAuthentication(AuthenticationManagerBuilder auth) throws Exception {
        auth
            .jdbcAuthentication()
                .dataSource(dataSource)
                .usersByUsernameQuery("SELECT username,password, 'true' FROM users WHERE username=?")
                .authoritiesByUsernameQuery("select username, 'USER' from users where username=?")
                .and()
            .inMemoryAuthentication()
                .withUser("user")
                .password("password")
                .roles("USER");
	}
}