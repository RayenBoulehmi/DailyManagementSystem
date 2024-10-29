package com.daily.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "costdata")
public class CostData {

    @Id
    private String id;

    private String semaine;
    private String date;
    private String refProduit;
    private String designationProduit;
    private int qteProduite;
    private int qteLivree;
    private int tpsdouvNette;
    private int tpsSTDUnitaire;
    private int tpsPointeeNetProduit;
    private int hrBadgees;
    private float eTPtheo;
    private float eTPReel;
    private int oBJEFFNET;
    private int oBJEFFBRUT;
    private float efficienceNette;
    private float efficienceBrute;
    private int iSOBJEFFNET;
    private int iSOBJEFFBRUT;

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSemaine() {
        return semaine;
    }

    public void setSemaine(String semaine) {
        this.semaine = semaine;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getRefProduit() {
        return refProduit;
    }

    public void setRefProduit(String refProduit) {
        this.refProduit = refProduit;
    }

    public String getDesignationProduit() {
        return designationProduit;
    }

    public void setDesignationProduit(String designationProduit) {
        this.designationProduit = designationProduit;
    }

    public int getQteProduite() {
        return qteProduite;
    }

    public void setQteProduite(int qteProduite) {
        this.qteProduite = qteProduite;
    }

    public int getQteLivree() {
        return qteLivree;
    }

    public void setQteLivree(int qteLivree) {
        this.qteLivree = qteLivree;
    }

    public int getTpsdouvNette() {
        return tpsdouvNette;
    }

    public void setTpsdouvNette(int tpsdouvNette) {
        this.tpsdouvNette = tpsdouvNette;
    }

    public int getTpsSTDUnitaire() {
        return tpsSTDUnitaire;
    }

    public void setTpsSTDUnitaire(int tpsSTDUnitaire) {
        this.tpsSTDUnitaire = tpsSTDUnitaire;
    }

    public int getTpsPointeeNetProduit() {
        return tpsPointeeNetProduit;
    }

    public void setTpsPointeeNetProduit(int tpsPointeeNetProduit) {
        this.tpsPointeeNetProduit = tpsPointeeNetProduit;
    }

    public int getHrBadgees() {
        return hrBadgees;
    }

    public void setHrBadgees(int hrBadgees) {
        this.hrBadgees = hrBadgees;
    }

    public float geteTPtheo() {
        return eTPtheo;
    }

    public void seteTPtheo(float eTPtheo) {
        this.eTPtheo = eTPtheo;
    }

    public float geteTPReel() {
        return eTPReel;
    }

    public void seteTPReel(float eTPReel) {
        this.eTPReel = eTPReel;
    }

    public int getoBJEFFNET() {
        return oBJEFFNET;
    }

    public void setoBJEFFNET(int oBJEFFNET) {
        this.oBJEFFNET = oBJEFFNET;
    }

    public int getoBJEFFBRUT() {
        return oBJEFFBRUT;
    }

    public void setoBJEFFBRUT(int oBJEFFBRUT) {
        this.oBJEFFBRUT = oBJEFFBRUT;
    }

    public float getEfficienceNette() {
        return efficienceNette;
    }

    public void setEfficienceNette(float efficienceNette) {
        this.efficienceNette = efficienceNette;
    }

    public float getEfficienceBrute() {
        return efficienceBrute;
    }

    public void setEfficienceBrute(float efficienceBrute) {
        this.efficienceBrute = efficienceBrute;
    }

    public int getiSOBJEFFNET() {
        return iSOBJEFFNET;
    }

    public void setiSOBJEFFNET(int iSOBJEFFNET) {
        this.iSOBJEFFNET = iSOBJEFFNET;
    }

    public int getiSOBJEFFBRUT() {
        return iSOBJEFFBRUT;
    }

    public void setiSOBJEFFBRUT(int iSOBJEFFBRUT) {
        this.iSOBJEFFBRUT = iSOBJEFFBRUT;
    }
}
