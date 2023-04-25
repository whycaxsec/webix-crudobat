import {JetView} from "webix-jet";

export default class transaksi_obat_detail extends JetView{
    config(){
        var ui = {rows:[
            { view:"template", template:"Data Transaksi Obat Detail", type:"header" },
            {
                view:"toolbar", paddingY:2,
                cols:[
                    { view:"button", click:()=>this.tambahtransaksi_obat_detail(), label:"Tambah",
                    type:"iconButton", width:100 },
                    { view:"button", click:()=>this.refreshtransaksi_obat_detail(), label:"Refresh",
                    type:"iconButton", width:100 },
                    { template:"", borderless:true},
                    { view:"button", click:()=>this.ubahtransaksi_obat_detail(), label:"Ubah",
                    type:"icon", icon :"wxi-pencil", width:100 },
                    { view:"button", click:()=>this.hapustransaksi_obat_detail(), label:"Hapus",
                    type:"icon", icon :"wxi-trash", width:100 },
                      { view:"button", click:()=>this.kartutransaksi_obat_detailPdf(), label:"cetak",
                    type:"iconButton", width:100 }
                ]
            },
            {
                view:"datatable",
                select:true,
                id:"tabeltransaksi_obat_detail",
                columns:[
                    { id:"id", header:["Id",{content:"textFilter"}], width:200 },
                    { id:"id_transaksi_obat", header:["Id Transaksi Obat",{content:"textFilter"}], width:200 },
                    { id:"id_obat", header:["Id Obat",{content:"textFilter"}], width:200 },
                    { id:"jumlah", header:["Jumlah",{content:"textFilter"}], width:200 },
                    { id:"harga", header:["Harga",{content:"textFilter"}], width:200 },
                ],
                pager:"pagertransaksi_obat_detail",
            },
            {
                view:"pager",
                id:"pagertransaksi_obat_detail",
                template:"{common.prev()} {common.pages()} {common.next()}",
                size:20,
                group:5
            },
        ]};
        return ui;
    }
    formtransaksi_obat_detail(){
        return {
            view:"window",
            id:"windowFormtransaksi_obat_detail",
            width:600,
            position:"center",
            modal:true,
            move:true,
            head:{
                view:"toolbar", margin:-4, cols:[
                    { view:"label", label: "Tambah", id:"judulFormtransaksi_obat_detail" },
                    { view:"button", type:"iconButton", label:"Tutup",
                    width:80, click:"$$('windowFormtransaksi_obat_detail').hide();"},
                ]
            },
            body:{
                view:"form",
                id:"formtransaksi_obat_detail",
                borderless:true,
                elements: [
                   { view:"text", label:'Id', name:"id", labelWidth:130, required:true },
                    { view:"richselect", label:'Id Tansaksi Obat', name:"id_transaksi_obat", labelWidth:130, required:true, options:"http://localhost:3000/transaksi_obat_detail/options" },
                    { view:"richselect", label:'Id Obat', name:"id_obat", labelWidth:130, required:true, options:"http://localhost:3000/transaksi_obat_detail/options1"},
                    { view:"text", label:'Jumlah', name:"jumlah", labelWidth:130, required:true },
                    { view:"text", label:'Harga', name:"harga", labelWidth:130, required:true },
                    { cols:[
                        { template:"", borderless:true },
                        { view:"button", click:()=>this.simpantransaksi_obat_detail(),
                        label:"Simpan", width:120, borderless:true },
                        { template:"", borderless:true },
                    ]}
                ]
            }
        };
    }
    refreshtransaksi_obat_detail(){
        $$("tabeltransaksi_obat_detail").clearAll();
        $$("tabeltransaksi_obat_detail").load("http://localhost:3000/transaksi_obat_detail");
    }

    tambahtransaksi_obat_detail(){
        $$("windowFormtransaksi_obat_detail").show();
        $$("formtransaksi_obat_detail").clear();
        $$("judulFormtransaksi_obat_detail").setValue("Form Tansaksi Obat Detail");
    }

    ubahtransaksi_obat_detail(){
        var row = $$("tabeltransaksi_obat_detail").getSelectedItem();
        if (row) {
            $$("windowFormtransaksi_obat_detail").show();
            $$("formtransaksi_obat_detail").clear();
            $$("formtransaksi_obat_detail").setValues(row);
            $$("judulFormtransaksi_obat_detail").setValue("Form Ubah transaksi_obat_detail");
        }
        else{
            webix.alert("Tidak ada data akun yang dipilih");
        }
    }

    simpantransaksi_obat_detail(){
        var context = this;

        if ($$('formtransaksi_obat_detail').validate()) {
            var dataKirim = $$("formtransaksi_obat_detail").getValues();

            var callbackHasil = {
                success:function(response,data,xhr){
                    $$("windowFormtransaksi_obat_detail").enable();
                    var response = JSON.parse(response);
                    webix.alert(response.pesan);
                    if(response.status==true){
                        context.refreshtransaksi_obat_detail();
                        $$('windowFormtransaksi_obat_detail').hide();
                    }
                },
                error:function(text,data,xhr){
                    webix.alert(text);
                    $$("windowFormtransaksi_obat_detail").enable();
                }
            };

            $$("windowFormtransaksi_obat_detail").disable();

            if (dataKirim.createdAt === undefined ) {
                webix.ajax().post("http://localhost:3000/transaksi_obat_detail", dataKirim, callbackHasil);
            } else {
                webix.ajax().put("http://localhost:3000/transaksi_obat_detail", dataKirim, callbackHasil);
            }
        }
    }
    
    hapustransaksi_obat_detail(){
        var row = $$("tabeltransaksi_obat_detail").getSelectedItem();
        if (row){
            var context = this;

            var callbackHasil = {
                success:function(response,data,xhr){
                    $$("windowFormtransaksi_obat_detail").enable();
                    var response = JSON.parse(response);
                    webix.alert(response.pesan);
                    if(response.status==true){
                        context.refreshtransaksi_obat_detail();
                        $$('windowFormtransaksi_obat_detail').hide();
                    }
                },
                error:function(text,data,xhr){
                    webix.alert(text);
                    $$("windowFormtransaksi_obat_detail").enable();
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
                        webix.ajax().del("http://localhost:3000/transaksi_obat_detail", row, callbackHasil);
                    }
                }
            });
        }
        else{
            webix.alert("Tidak ada data yang dipilih");
        }
    }

    kartutransaksi_obat_detailPdf(){
    var row = $$("tabeltransaksi_obat_detail").getSelectedItem();
    if (row){
        $$("kartutransaksi_obat_detail").parse(row);
        webix.print($$("kartutransaksi_obat_detail"));
    } else {
        webix.alert("tidak ada data yang dipilih");
    }
}

    kartutransaksi_obat_detail(){
    return{
        view:"template",
        id:"kartutransaksi_obat_detail",
        template:`
        <h1> Rumah Sakit UDB </h1>
        <h2>Detai Transaksi Obat</h2>
        <hr>
        <table width='300'>
                    <tr>
                        <td width='200'>No. ID: </td><td>#id#</td>
                    </tr>
                    <tr>
                        <td>Id Transaksi Obat: </td><td>#id_transaksi_obat#</td>
                    </tr>
                    <tr>
                        <td>Id Obat: </td><td>#id_obat#</td>
                    </tr>
                     <tr>
                        <td>jumlah: </td><td>#jumlah#</td>
                    </tr>
                     <tr>
                        <td>harga: </td><td>#harga#</td>
                    </tr>
                </table>`
        
    };
}

    init(){
        this.ui(this.formtransaksi_obat_detail());
        this.ui(this.kartutransaksi_obat_detail());
    }

    ready(){
        this.refreshtransaksi_obat_detail();
    }

}