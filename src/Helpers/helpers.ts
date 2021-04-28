export function StringisNullOrEmpity(str:any) {
    if (str == '' || str == null || 0 === str.length || str == undefined) {
        return true
    }
    else{
        return false
    }
}