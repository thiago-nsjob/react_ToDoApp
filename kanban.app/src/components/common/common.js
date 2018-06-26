
export default{
    
    usernameValidationPattern() {
        //http://regexlib.com/REDetails.aspx?regexp_id=186
        return "^([1-zA-Z0-1@.\s]{1,255})$";
    } ,
    passwordValidationPattern() {
        //http://regexlib.com/REDetails.aspx?regexp_id=887
        return "(?=^.{6,255}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*";
    } 
    
}