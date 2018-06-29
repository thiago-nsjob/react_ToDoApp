
    //http://regexlib.com/REDetails.aspx?regexp_id=186
    export const  usernameValidationPattern ="^([1-zA-Z0-1@.\s]{8,255})$";

    //http://regexlib.com/REDetails.aspx?regexp_id=887
    export const passwordValidationPattern ="(?=^.{6,255}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*";
    
