import React, { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    mask: "CEP" | "REALCURRENCY" | "DOLARCURRENCY" | "EUROCURRENCY" | "CELLPHONE" | "CPF" | "CNPJ" | "NUMBER" | "TEXT" | "DATA",
    name: string
    Required?: boolean | true
    RequiredText?: string
}

export function cep(e: React.FormEvent<HTMLInputElement>) {
    e.currentTarget.maxLength = 9;
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{5})(\d)/, "$1-$2")
    e.currentTarget.value = value;
    return e;
}

export function currency(e: React.FormEvent<HTMLInputElement>) {
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{2})$/, "$1,$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".")
    e.currentTarget.value = value;
    return e;
}

export function cellphone(e: React.FormEvent<HTMLInputElement>) {
    e.currentTarget.maxLength = 16;
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, "")
    value = value.replace(/(.{0})(\d)/, "$1 ($2")
    value = value.replace(/(.{4})(\d)/, "$1) $2")
    if (value.length == 10) {
        value = value.replace(/(.{1})$/, "-$1")
    } else if (value.length == 11) {
        value = value.replace(/(.{2})$/, "-$1")
    } else if (value.length == 12) {
        value = value.replace(/(.{3})$/, "-$1")
    } else if (value.length == 13) {
        value = value.replace(/(.{4})$/, "-$1")
    } else if (value.length > 13) {
        value = value.replace(/(.{4})$/, "-$1")
    }
    e.currentTarget.value = value;
    return e;
}

export function CPF(e: React.FormEvent<HTMLInputElement>) {
    e.currentTarget.maxLength = 14;
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{2})$/, "$1-$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".")
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
    value = value.replace(/\D/g, "")
    value = value.replace(/(\d{2})(\d)/, "$1/$2")
    value = value.replace(/(\d{2})(\d)/, "$1/$2")
    value = value.replace(/(\d{4})(\d)/, "$1");
    e.currentTarget.value = value;
    return e;
}