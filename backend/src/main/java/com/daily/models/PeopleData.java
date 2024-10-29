package com.daily.models;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "peopledata")
@NoArgsConstructor
@Data
public class PeopleData {

    @Id
    private String id;

    @Field("Semaine")
    private String semaine;

    @Field("Date")
    private String date;

    @Field("NZONE")
    private String nzone;

    @Field("NameZONE")
    private String nameZONE;

    @Field("NAtelier")
    private String nAtelier;

    @Field("NameAtelier")
    private String nameAtelier;

    @Field("ObjAbs")
    private int objAbs;

    @Field("TxAbs")
    private float txAbs;

    @Field("ObjPolyvalence")
    private int objPolyvalence;

    @Field("TxPolyvalence")
    private float txPolyvalence;

    @Field("ISAbs")
    private int isAbs;

    @Field("ISPolyvalence")
    private int isPolyvalence;
}
