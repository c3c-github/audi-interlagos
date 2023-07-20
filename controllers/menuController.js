const http = require('https');

const form = (req, res) => {
    res.render("form", {form : {'name': 'PAYMENTS'}} );
}

const thanks = (req, res) => {
        const postData = JSON.stringify({
            grant_type: "client_credentials",
            client_id: "bbov8owdgojqammn59ejtsbq",
            client_secret: "kYC6uRZeNDIdMZAPKWqC5HXD"    
        });

        const options = {
            hostname: 'mcc62qyxnq0y3c33dwzj4mkhzw0q.auth.marketingcloudapis.com',
            path: '/v2/token',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': postData.length,
            }
        };

        const authReq = http.request(options, (resAuth) => {
            let responseData = '';

            resAuth.on('data', (chunk) => {
                responseData += chunk;
            });

            resAuth.on('end', () => {
                
                let authResponse = JSON.parse(responseData);

                const postDE = JSON.stringify([
                    {
                        keys:{
                            "Id": req.body.document
                        },
                        values:{
                            "Nome": req.body.name,
                            "Telefone" : req.body.phone,
                            "Email" : req.body.email,
                            "Estado" : req.body.state,
                            "Cidade" : req.body.city,
                            "Documento" : req.body.document,
                            "Concessionaria" : req.body.seller,
                            "Modelo" : req.body.vehiclemodel
                        }
                    }
                ]);

                const optionsDE = {
                    hostname: 'mcc62qyxnq0y3c33dwzj4mkhzw0q.rest.marketingcloudapis.com',
                    path: '/hub/v1/dataevents/key:940A0128-1E5C-46AE-BE7E-DA7A8361D999/rowset',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization' : 'Bearer '+authResponse.access_token
                    }
                };

                console.log('optionsDE: '+JSON.stringify(optionsDE));
                console.log('postDE: '+postDE);

                const authDE = http.request(optionsDE, (resDE) => {
                    let responseData = '';
        
                    resDE.on('data', (chunk) => {
                        responseData += chunk;
                    });
        
                    resDE.on('end', () => {
                        let deResponse = JSON.parse(responseData);
                        
                        res.render("thanks", {} );
                    });
                });

                authDE.on('error', (error) => {
                    console.error(error);
                });

                authDE.write(postDE);
                authDE.end();

            });
        });

        authReq.on('error', (error) => {
            console.error(error);
        });

        authReq.write(postData);
        authReq.end();
}

module.exports =  {
    form,
    thanks
};