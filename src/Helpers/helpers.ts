export function StringisNullOrEmpity(str: string) {
    if (str == '' || str == null || 0 === str.length) {
        return true
    }
    else{
        return false
    }
}