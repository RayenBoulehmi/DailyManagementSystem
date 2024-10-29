package com.daily.models;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "deliverydata")
public class DeliveryData {

    @Id
    private String id;

    private String semaine;
    private String date;
    private String refProduit;   // Used camelCase for field names to match Java conventions
    private String designationProduit;
    private int qteProduite;
    private int qteLanceePDP;
    private String qteEngClient;
    private int qteLivree;
    private int objOTP;
    private int objOTD;
    private float oTD;
    private float oTP;
    private int iSObjOTP;
    private int iSObjOTD;

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

    public int getQteLanceePDP() {
        return qteLanceePDP;
    }

    public void setQteLanceePDP(int qteLanceePDP) {
        this.qteLanceePDP = qteLanceePDP;
    }

    public String getQteEngClient() {
        return qteEngClient;
    }

    public void setQteEngClient(String qteEngClient) {
        this.qteEngClient = qteEngClient;
    }

    public int getQteLivree() {
        return qteLivree;
    }

    public void setQteLivree(int qteLivree) {
        this.qteLivree = qteLivree;
    }

    public int getObjOTP() {
        return objOTP;
    }

    public void setObjOTP(int objOTP) {
        this.objOTP = objOTP;
    }

    public int getObjOTD() {
        return objOTD;
    }

    public void setObjOTD(int objOTD) {
        this.objOTD = objOTD;
    }

    public float getOTD() {
        return oTD;
    }

    public void setOTD(float oTD) {
        this.oTD = oTD;
    }

    public float getOTP() {
        return oTP;
    }

    public void setOTP(float oTP) {
        this.oTP = oTP;
    }

    public int getISObjOTP() {
        return iSObjOTP;
    }

    public void setISObjOTP(int iSObjOTP) {
        this.iSObjOTP = iSObjOTP;
    }

    public int getISObjOTD() {
        return iSObjOTD;
    }

    public void setISObjOTD(int iSObjOTD) {
        this.iSObjOTD = iSObjOTD;
    }
}
