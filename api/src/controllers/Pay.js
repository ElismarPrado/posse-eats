module.exports = {
  // criar sessão----------------------------------------
  async sessao(req, res) {
    var request = require('request');
        var options = {
          'method': 'POST',
          'url': 'https://ws.sandbox.pagseguro.uol.com.br/v2/sessions?email=elismar-prado@hotmail.com&token=0F7B1D2B88AB405B8C4AD66997AF0188',
          'headers': {
          }
        };
        request(options, function (error, response) { 
          if (error) throw new Error(error);
            res.send(response.body)
          });
      },

//Obter bandeira do cartão------------------------------
  async bandeira(req, res){
    const { sessionId, bin } = req.body
    var request = require('request');
      var options = {
        'method': 'GET',
        'url': `https://df.uol.com.br/df-fe/mvc/creditcard/v1/getBin?tk=${sessionId}&creditCard=${bin}`,
        'headers': {
        }
      };
      request(options, function (error, response) { 
        if (error) throw new Error(error);
        const dados = response.body
          res.send(dados);
      });  
    },


//Obter Token do cartão-------------------------------
  token(req, res) {

    const {sessionId, amount, cardNumber, cardBrand, cardCvv, cardExpirationMonth, cardExpirationYear} = req.body
    var request = require('request');
          var options = {
            'method': 'POST',
            'url': 'https://df.uol.com.br',
            'headers': {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
              'sessionId': sessionId,
              'amount': amount,
              'cardNumber': cardNumber,
              'cardBrand': cardBrand,
              'cardCvv': cardCvv,
              'cardExpirationMonth': cardExpirationMonth,
              'cardExpirationYear': cardExpirationYear
            }
          };
          request(options, function (error, response) { 
            if (error) throw new Error(error);
            res.send(response.body);
          });
          
        },

        pay(req, res){
          var request = require('request');
          const {
            email,
            token,
          } = req.body
            var options = {
              'method': 'POST',
              'url': `https://ws.sandbox.pagseguro.uol.com.br/v2/transactions?email=${email}&token=${token}`,
              'headers': {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              form: {
                'paymentMode': 'default',
                'paymentMethod': 'creditCard',
                'receiverEmail': 'comprador@sandbox.pagseguro.com.br',
                'currency': 'BRL',
                'extraAmount': '1.00',
                'itemId1': '0001',
                'itemDescription1': 'NotebookPrata',
                'itemAmount1': '24300.00',
                'itemQuantity1': '1',
                'notificationURL': 'https://sualoja.com.br/notifica.html',
                'reference': 'REF1234',
                'senderName': 'JoseComprador',
                'senderCPF': '22111944785',
                'senderAreaCode': '11',
                'senderPhone': '56273440',
                'senderEmail': 'comprador@uol.com.br',
                'senderHash': '{{ADICIONE O HASH}}',
                'shippingAddressStreet': 'Av.Brig.FariaLima',
                'shippingAddressNumber': '1384',
                'shippingAddressComplement': '5oandar',
                'shippingAddressDistrict': 'JardimPaulistano',
                'shippingAddressPostalCode': '01452002',
                'shippingAddressCity': 'SaoPaulo',
                'shippingAddressState': 'SP',
                'shippingAddressCountry': 'BRA',
                'shippingType': '1',
                'shippingCost': '1.00',
                'creditCardToken': '{{TOKEN DE CARTÃO}}',
                'installmentQuantity': '5',
                'installmentValue': '125.22',
                'noInterestInstallmentQuantity': '2',
                'creditCardHolderName': 'JoseComprador',
                'creditCardHolderCPF': '22111944785',
                'creditCardHolderBirthDate': '27/10/1987',
                'creditCardHolderAreaCode': '11',
                'creditCardHolderPhone': '56273440',
                'billingAddressStreet': 'Av.Brig.FariaLima',
                'billingAddressNumber': '1384',
                'billingAddressComplement': '5oandar',
                'billingAddressDistrict': 'JardimPaulistano',
                'billingAddressPostalCode': '01452002',
                'billingAddressCity': 'SaoPaulo',
                'billingAddressState': 'SP',
                'billingAddressCountry': 'BRA'
              }
            };
            request(options, function (error, response) { 
              if (error) throw new Error(error);
              res.send(response.body);
            });
        }

    }