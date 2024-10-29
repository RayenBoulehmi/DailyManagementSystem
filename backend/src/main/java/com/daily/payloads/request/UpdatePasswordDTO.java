package com.daily.payloads.request;

import lombok.Getter;

import javax.validation.constraints.NotNull;


/**
 * @author Rayen Boulehmi
 */
@Getter
public class UpdatePasswordDTO {
    @NotNull
    private String oldPassword;

    @NotNull
    private String newPassword;
}
