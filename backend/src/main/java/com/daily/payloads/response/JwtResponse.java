package com.daily.payloads.response;

import lombok.Setter;

import java.util.List;

/**
 * @author Rayen
 */
@Setter
public class JwtResponse {
  private String token;
  private String type = "Bearer";
  private String id;
  private String username;
  private String email;
  private String phone;
  private String address;
  private List<String> roles;

  public JwtResponse(String accessToken, String id, String email, String username,String phone, String address, List<String> roles) {
    this.token = accessToken;
    this.id = id;
    this.email = email;
    this.username = username;
    this.phone = phone;
    this.address=address;
    this.roles = roles;
  }


}
