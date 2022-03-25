var subject;
function check(){
    subject = document.getElementById("isbn").value;
    result();
}


// Checks for ISBN-10 or ISBN-13 format
var regex = /^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/;

function result(){
    if (regex.test(subject)) {
        // Remove non ISBN digits, then split into an array
        var chars = subject.replace(/[- ]|^ISBN(?:-1[03])?:?/g, "").split("");
        // Remove the final ISBN digit from `chars`, and assign it to `last`
        var last = chars.pop();
        var sum = 0;
        var check, i;
    
        if (chars.length == 9) {
            // Compute the ISBN-10 check digit
            chars.reverse();
            for (i = 0; i < chars.length; i++) {
                sum += (i + 2) * parseInt(chars[i], 10);
            }
            check = 11 - (sum % 11);
            if (check == 10) {
                check = "X";
            } else if (check == 11) {
                check = "0";
            }
        } else {
            // Compute the ISBN-13 check digit
            for (i = 0; i < chars.length; i++) {
                sum += (i % 2 * 2 + 1) * parseInt(chars[i], 10);
            }
            check = 10 - (sum % 10);
            if (check == 10) {
                check = "0";
            }
        }
    
        if (check == last) {
            document.getElementById("output").style = "color:green;";
            document.getElementById("output").innerHTML = "Valid ISBN";
            // alert("Valid ISBN");
        } else {
            document.getElementById("output").style = "color:red;";
            document.getElementById("output").innerHTML = "Invalid ISBN check digit";
            //alert("Invalid ISBN check digit");
        }
    } else {
        document.getElementById("output").style = "color:red;";
        document.getElementById("output").innerHTML = "Invalid ISBN";
        // alert("Invalid ISBN");
    }
}