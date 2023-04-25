import {JetView} from "webix-jet";

export default class transaksi_obat extends JetView{
    config(){
        var ui = {rows:[
            { view:"template", template:"Data Transaksi Obat", type:"header" },
            {
                view:"toolbar", paddingY:2,
                cols:[
                    { view:"button", click:()=>this.tambahtransaksi_obat(), label:"Tambah",
                    type:"iconButton", width:100 },
                    { view:"button", click:()=>this.refreshtransaksi_obat(), label:"Refresh",
                    type:"iconButton", width:100 },
                    { template:"", borderless:true},
                     { view:"button", click:()=>this.ubahtransaksi_obat(), label:"Ubah",
                    type:"icon", icon :"wxi-pencil", width:100 },
                    { view:"button", click:()=>this.hapustransaksi_obat(), label:"Hapus",
                    type:"icon", icon :"wxi-trash", width:100 }
                    
                ]
            },
            {
                view:"datatable",
                select:true,
                id:"tabeltransaksi_obat",
                columns:[
                    { id:"id", header:["Id",{content:"textFilter"}], width:200 },
                    { id:"id_transaksi_periksa", header:["Id transaksi Periksa",{content:"textFilter"}], width:200 },
                ],
                pager:"pagertransaksi_obat",
            },
            {
                view:"pager",
                id:"pagertransaksi_obat",
                template:"{common.prev()} {common.pages()} {common.next()}",
                size:20,
                group:5
            },
        ]};
        return ui;
    }
    formtransaksi_obat(){
        return {
            view:"window",
            id:"windowFormtransaksi_obat",
            width:600,
            position:"center",
            modal:true,
            move:true,
            head:{
                view:"toolbar", margin:-4, cols:[
                    { view:"label", label: "Tambah", id:"judulFormtransaksi_obat" },
                    { view:"button", type:"iconButton", label:"Tutup",
                    width:80, click:"$$('windowFormtransaksi_obat').hide();"},
                ]
            },
            body:{
                view:"form",
                id:"formtransaksi_obat",
                borderless:true,
                elements: [
                   { view:"text", label:'Id', name:"id", labelWidth:150, required:true },
                    { view:"combo", label:'Id Transaksi Periksa', name:"id_transaksi_periksa", labelWidth:150, required:true , options:"http://localhost:3000/transaksi_priksa/options"},
                    
                    { cols:[
                        { template:"", borderless:true },
                        { view:"button", click:()=>this.simpantransaksi_obat(),
                        label:"Simpan", width:120, borderless:true },
                        { template:"", borderless:true },
                    ]}
                ]
            }
        };
    }
    refreshtransaksi_obat(){
        $$("tabeltransaksi_obat").clearAll();
        $$("tabeltransaksi_obat").load("http://localhost:3000/transaksi_obat");
    }

    tambahtransaksi_obat(){
        $$("windowFormtransaksi_obat").show();
        $$("formtransaksi_obat").clear();
        $$("judulFormtransaksi_obat").setValue("Form Tambah Transaksi Obat");
    }

    ubahtransaksi_obat(){
        var row = $$("tabeltransaksi_obat").getSelectedItem();
        if (row) {
            $$("windowFormtransaksi_obat").show();
            $$("formtransaksi_obat").clear();
            $$("formtransaksi_obat").setValues(row);
            $$("judulFormtransaksi_obat").setValue("Form Ubah transaksi_obat");
        }
        else{
            webix.alert("Tidak ada data akun yang dipilih");
        }
    }

    simpantransaksi_obat(){
        var context = this;

        if ($$('formtransaksi_obat').validate()) {
            var dataKirim = $$("formtransaksi_obat").getValues();

            var callbackHasil = {
                success:function(response,data,xhr){
                    $$("windowFormtransaksi_obat").enable();
                    var response = JSON.parse(response);
                    webix.alert(response.pesan);
                    if(response.status==true){
                        context.refreshtransaksi_obat();
                        $$('windowFormtransaksi_obat').hide();
                    }
                },
                error:function(text,data,xhr){
                    webix.alert(text);
                    $$("windowFormtransaksi_obat").enable();
                }
            };

            $$("windowFormtransaksi_obat").disable();

            if (dataKirim.createdAt === undefined ) {
                webix.ajax().post("http://localhost:3000/transaksi_obat", dataKirim, callbackHasil);
            } else {
                webix.ajax().put("http://localhost:3000/transaksi_obat", dataKirim, callbackHasil);
            }
        }
    }
    
    hapustransaksi_obat(){
        var row = $$("tabeltransaksi_obat").getSelectedItem();
        if (row){
            var context = this;

            var callbackHasil = {
                success:function(response,data,xhr){
                    $$("windowFormtransaksi_obat").enable();
                    var response = JSON.parse(response);
                    webix.alert(response.pesan);
                    if(response.status==true){
                        context.refreshtransaksi_obat();
                        $$('windowFormtransaksi_obat').hide();
                    }
                },
                error:function(text,data,xhr){
                    webix.alert(text);
                    $$("windowFormtransaksi_obat").enable();
                }
            };

            webix.confirm({
                type:"confirm-warning",
                title: "Konfirmasi",
                ok:"Yakin",
                cancel:"Batal",
                text: "Anda yakin ingin menghapus data ini ?",
                callback:function(jwb){
                    if(jwb) {
                        webix.ajax().del("http://localhost:3000/transaksi_obat", row, callbackHasil);
                    }
                }
            });
        }
        else{
            webix.alert("Tidak ada data yang dipilih");
        }
    }

    

    init(){
        this.ui(this.formtransaksi_obat());
        
    }

    ready(){
        this.refreshtransaksi_obat();
    }

}