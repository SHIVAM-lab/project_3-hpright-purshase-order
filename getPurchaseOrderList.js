const fun = require('./function');

async function purchaseOrderList() {
    try {
        var a = await fun.query_exec(`select * from nrm_doc_header`);
        console.log(a.length);
        var array = [];
        for (let i = 0; i < a.length; i++) {
            var check = await fun.query_exec(`select * from nrm_doc_type where doc_type_id = '${a[i].doc_type_id}'`);
            if(check[0].doc_type_id == 2)
            console.log(a[i].doc_header_id);
            if (check.length != 0 && check[0].doc_type_prefix == 'PO') {
                console.log(`sl`+i);
                var x = '',
                    y = '',
                    z = '';
                var b = await fun.query_exec(`select * from nrm_business where business_id = '${a[i].business_id}'`);
                if (b.length != 0)
                    x = b[0].business_name;
                var c = await fun.query_exec(`select * from nrm_doc_status where doc_status_id ='${a[i].doc_status_id}'`);
                if (c.length != 0)
                    y = c[0].doc_status_name
                var d = await fun.query_exec(`select * from nrm_sites where site_id = '${a[i].site_id}'`);
                if (d.length != 0) {
                    z = d[0].site_name;
                }
                console.log(x,y,z);
                var data = {
                    'amount': a[i].doc_total_amount,
                    'po_date': a[i].doc_issued_date,
                    'supplier': x,
                    'status': y,
                    'po_number': a[i].doc_code,
                    'doc_header_id': a[i].doc_header_id
                }
                array[i] = data;
                console.log(data);
            }
        }
        console.log(array.length);
        return ({
            'status': 1,
            'data': array,
            'message': 'Purchase Order List Sent Successfully!',
            'error': null
        });
    } catch (error) {
        if (error) {
            console.log(error);
            return ({
                'status': 0,
                'message': 'Failed to send Purchase Order List!',
                'error': error
            });
        }
    }
}

module.exports = {
    purchaseOrderList
}