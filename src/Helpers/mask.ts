import React, { InputHTMLAttributes } from "react";


export interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    mask: "CEP" | "REALCURRENCY" | "DOLARCURRENCY" | "EUROCURRENCY" | "CELLPHONE" | "CPF" | "CNPJ" | "NUMBER" | "TEXT" | "DATA",
    name: string
    Required?: boolean | true
    RequiredText?: string
}

export function cep(e: React.FormEvent<HTMLInputElement>) {
    e.currentTarget.maxLength = 9;
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{5})(\d)/,"$1-$2")
    e.currentTarget.value = value;
    return e;
}

export function currency(e: React.FormEvent<HTMLInputElement>) {
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{2})$/, "$1,$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g,".")
    e.currentTarget.value = value;
    return e;
}

export function cellphone(e: React.FormEvent<HTMLInputElement>) {
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, "");

    e.currentTarget.value = value;
    return e;
}

export function CPF(e: React.FormEvent<HTMLInputElement>) {
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, "");

    e.currentTarget.value = value;
    return e;
}
export function CNPJ(e: React.FormEvent<HTMLInputElement>) {
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, "");

    e.currentTarget.value = value;
    return e;
}
export function number(e: React.FormEvent<HTMLInputElement>) {
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, "");
    e.currentTarget.value = value;
    return e;
}

export function text(e: React.FormEvent<HTMLInputElement>) {
    let value = e.currentTarget.value;
    e.currentTarget.value = value;
    return e;
}

export function data(e: React.FormEvent<HTMLInputElement>) {
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, "");

    e.currentTarget.value = value;
    return e;
}