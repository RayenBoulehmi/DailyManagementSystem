package com.daily.models;

/*
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "deliverydata")
@NoArgsConstructor
@Getter
@Setter
public class ProductionData {

 @Id
 private String id;

 @Field("Semaine")
 private String semaine;

 @Field("Date")
 private String date;

 @Field("Réf Produit")
 private String refProduit;

 @Field("DésignationProduit")
 private String designationProduit;

 @Field("QtéProduite")
 private int qteProduite;

 @Field("QtéLancéePDP")
 private int qteLanceePDP;

 @Field("QtéEng.Client")
 private String qteEngClient;

 @Field("QtéLivrée")
 private int qteLivree;

 @Field("ObjOTP")
 private int objOTP;

 @Field("ObjOTD")
 private int objOTD;

 @Field("OTD")
 private float otd;

 @Field("OTP")
 private float otp;

 @Field("ISObjOTP")
 private int isObjOTP;

 @Field("ISObjOTD")
 private int isObjOTD;
}
*/


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "qualitydata")
@NoArgsConstructor
@Getter
@Setter
public class QualityData {

 @Id
 private String id;

 @Field("Semaine")
 private String semaine;

 @Field("Date")
 private String date;

 @Field("RefProduit")
 private String refProduit;

 @Field("NZONE")
 private String nzone;

 @Field("DesignationProduit")
 private String designationProduit;

 @Field("TravailEnCours(WIP)")
 private String travailEnCoursWIP;

 @Field("QteProduite")
 private int qteProduite;

 @Field("QteLanceePDP")
 private int qteLanceePDP;

 @Field("QteLivree")
 private int qteLivree;

 @Field("TpsSTDUnitaire")
 private int tpsSTDUnitaire;

 @Field("NbrDefautInt")
 private int nbrDefautInt;

 @Field("QterebutInt")
 private int qteRebutInt;

 @Field("QteReclamee")
 private int qteReclamee;

 @Field("ObjNQInt")
 private float objNQInt;

 @Field("ObjDPU")
 private float objDPU;

 @Field("ObjNQExt")
 private float objNQExt;

 @Field("ObjPPMInt")
 private int objPPMInt;

 @Field("ObjPPMClient")
 private float objPPMClient;

 @Field("TxNQInt")
 private float txNQInt;

 @Field("DPU")
 private int dpu;

 @Field("TxNQExt")
 private float txNQExt;

 @Field("PPMRebutInt")
 private int ppmRebutInt;

 @Field("PPMClient")
 private float ppmClient;

 @Field("isObjNQInt")
 private int isObjNQInt;

 @Field("isObjDPU")
 private int isObjDPU;

 @Field("isObjNQExt")
 private int isObjNQExt;

 @Field("isObjPPMInt")
 private int isObjPPMInt;

 @Field("isObjPPMClient")
 private int isObjPPMClient;
}