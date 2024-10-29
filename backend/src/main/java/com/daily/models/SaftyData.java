package com.daily.models;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


@Document(collection = "saftydata")
@NoArgsConstructor
@Getter
@Setter
public class SaftyData {

    @Id
    private String id;
    private String Semaine;
    private String Date;
    private String NZONE;
    private String NameZONE;
    private String NAtelier;
    private String NameAtelier;
    private int ObjSafety;
    @Field("NaccidentAvecArrêt ")
    private int NaccidentAvecArret;
    }