const fs = require('fs');

export const read = (o:object, f:string) => {
    const json:string = JSON.stringify(o, null, 2);
    fs.writeFile(f, json, (err) => {
        if (err) {
            console.log(err);
        }
        console.log(`${f} created!`);
    });
}

export const sum = (a:number[]) => {
    let sum:number = 0;
    for (let i = 0; i < a.length; i++) {
        sum += a[i];
    }
    return sum;
}

export const mean = (a:number[]) => {
    return sum(a) / a.length;
}

export const std = (a:number[], mean_a:number) => {
    let x:number = 0;
    a.forEach(n => {
        x += ((n - mean_a) * (n - mean_a));
    })
    return Math.sqrt(x / a.length);
}

export const z_score = (n:number, mean:number, std:number) => {
    return (n - mean) / std;
}
