import {JetView} from "webix-jet";

export default class obat extends JetView{
    config(){
        var ui = {rows:[
            { view:"template", template:"Data obat", type:"header" },
            {
                view:"toolbar", paddingY:2,
                cols:[
                    { view:"button", click:()=>this.tambahobat(), label:"Tambah", type:"iconButton", width:100 },
                    { view:"button", click:()=>this.refreshobat(), label:"Refresh", type:"iconButton", width:100 },
                    { template:"", borderless:true},
                     { view:"button", click:()=>this.ubahobat (), label:"Ubah",
                    type:"icon", icon :"wxi-pencil", width:100 },
                    { view:"button", click:()=>this.hapusobat(), label:"Hapus",
                    type:"icon", icon :"wxi-trash", width:100 }
                ]
            },
            {
                view:"datatable",
                select:true,
                id:"tabelobat",
                columns:[
                    { id:"id", header:["ID",{content:"textFilter"}], width:100 },
                    { id:"nama", header:["Nama",{content:"textFilter"}], width:300 },
                    { id:"harga", header:["Harga",{content:"textFilter"}], width:300 },
                ],
                pager:"pagerobat",
            },
            {
                view:"pager",
                id:"pagerobat",
                template:"{common.prev()} {common.pages()} {common.next()}",
                size:20,
                group:5
            },
        ]};
        return ui;
    }
    formobat(){
        return {
            view:"window",
            id:"windowFormobat",
            width:600,
            position:"center",
            modal:true,
            move:true,
            head:{
                view:"toolbar", margin:-4, cols:[
                    { view:"label", label: "Tambah", id:"judulFormobat" },
                    { view:"button", type:"iconButton", label:"Tutup",
                    width:80, click:"$$('windowFormobat').hide();"},
                ]
            },
            body:{
                view:"form",
                id:"formobat",
                borderless:true,
                elements: [
                    { view:"text", label:'ID', name:"id", labelWidth:100, required:true },
                    { view:"text", label:'Nama', name:"nama", labelWidth:100, required:true },
                    { view:"text", label:'Harga', name:"harga", labelWidth:100, required:true },
                    { cols:[
                        { template:"", borderless:true },
                        { view:"button", click:()=>this.simpanobat(),
                        label:"Simpan", width:120, borderless:true },
                        { template:"", borderless:true },
                    ]}
                ]
            }
        };
    }
    refreshobat(){
        $$("tabelobat").clearAll();
        $$("tabelobat").load("http://localhost:3000/obat");
    }

    tambahobat(){
        $$("windowFormobat").show();
        $$("formobat").clear();
        $$("judulFormobat").setValue("Form Tambah obat");
    }

    ubahobat(){
        var row = $$("tabelobat").getSelectedItem();
        if (row) {
            $$("windowFormobat").show();
            $$("formobat").clear();
            $$("formobat").setValues(row);
            $$("judulFormobat").setValue("Form Ubah obat");
        }
        else{
            webix.alert("Tidak ada data akun yang dipilih");
        }
    }

    simpanobat(){
        var context = this;

        if ($$('formobat').validate()) {
            var dataKirim = $$("formobat").getValues();

            var callbackHasil = {
                success:function(response,data,xhr){
                    $$("windowFormobat").enable();
                    var response = JSON.parse(response);
                    webix.alert(response.pesan);
                    if(response.status==true){
                        context.refreshobat();
                        $$('windowFormobat').hide();
                    }
                },
                error:function(text,data,xhr){
                    webix.alert(text);
                    $$("windowFormobat").enable();
                }
            };

            $$("windowFormobat").disable();

            if (dataKirim.createdAt === undefined ) {
                webix.ajax().post("http://localhost:3000/obat", dataKirim, callbackHasil);
            } else {
                webix.ajax().put("http://localhost:3000/obat", dataKirim, callbackHasil);
            }
        }
    }
    
    hapusobat(){
        var row = $$("tabelobat").getSelectedItem();
        if (row){
            var context = this;

            var callbackHasil = {
                success:function(response,data,xhr){
                    $$("windowFormobat").enable();
                    var response = JSON.parse(response);
                    webix.alert(response.pesan);
                    if(response.status==true){
                        context.refreshobat();
                        $$('windowFormobat').hide();
                    }
                },
                error:function(text,data,xhr){
                    webix.alert(text);
                    $$("windowFormobat").enable();
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
                        webix.ajax().del("http://localhost:3000/obat", row, callbackHasil);
                    }
                }
            });
        }
        else{
            webix.alert("Tidak ada data yang dipilih");
        }
    }

    init(){
        this.ui(this.formobat());
    }

    ready(){
        this.refreshobat();
    }
}