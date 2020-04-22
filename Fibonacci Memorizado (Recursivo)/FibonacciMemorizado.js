var bigInt = require("big-integer");
var memo = [];
var fibo = function(n) {
    if (n == 1 || n == 2) {
        return bigInt.one;
    } else if (n > 2) {
        if (memo[n] == null) {
            memo[n] = fibo(n - 1).add(fibo(n - 2));
        }
        return memo[n];
    }
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let nth = req.body.nth
    let nth_1 = bigInt.one;
    let nth_2 = bigInt.zero;
    let answer = bigInt.zero;

    if (nth < 0)
        throw 'must be greater than 0'
    else if (nth === 0)
        answer = nth_2
    else if (nth === 1)
        answer = nth_1
    else {
        memo = [];
        for (var i = 0; i <= nth; i++) {
            memo.push(null);
        }  
        answer = fibo(nth);
        /*for (var i = 0; i < nth - 1; i++) {
            answer = nth_2.add(nth_1)
            nth_2 = nth_1
            nth_1 = answer
        }*/
    }

    context.res = {
        body: answer.toString()
    };
}