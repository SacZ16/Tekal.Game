import {CHANGE_TEMPLATE, CHANGE_VIDEO, REC_VIDEO} from './action';

const initialState = {
    template: [],
    recVideo: [],
    videos:[
        {type:'vig',   id:1,url:"https://drive.google.com/uc?id=1IRBWqelfK8nlulE1N0pSJ7p-gZIBH1_n"},
        {type:'filler',id:2,url:"https://drive.google.com/uc?id=16ecP1lv8-6FuoXHl_zaK8gSrxzC9Zsj6"},
        {type:'filler',id:3,url:"https://drive.google.com/uc?id=15w7yOHUze4LWpS1pNtuPzg0dazK4TQrk"},
        {type:'filler',id:4,url:"https://drive.google.com/uc?id=1b2uKuusluPP74zJZPH9zmaxG1YAAxKCW"},
        {type:'filler',id:5,url:"https://drive.google.com/uc?id=1Do3VwjVS58EtJN-7HEV5R88iBGvo3WN-"},
        {type:'filler',id:6,url:"https://drive.google.com/uc?id=1A5EbGYGl3gfWjwyvyYJD_bubiLgyZ7Fj"},
        {type:'filler',id:7,url:"https://drive.google.com/uc?id=187ZSaMPx4U0rR2CS6QoNls8c4YcsWD7X"},
        {type:'vig',   id:8,url:"https://drive.google.com/uc?id=16Flk_OyLUctRwGCNBSS7m7bsozLFFLMu"},
        {type:'filler',id:9,url:"https://drive.google.com/uc?id=1RWFoF_Do_8BIB1MMvzV3eRDJUkGG648z"},
        {type:'filler',id:10,url:"https://drive.google.com/uc?id=1lmAEkuyHn6qggDZns7AWE9Fzr_sGalZN"},
        {type:'filler',id:11,url:"https://drive.google.com/uc?id=1Rffwmw3cW13HU8dzmtd_WrtIu_uIWZJz"},
        {type:'filler',id:12,url:"https://drive.google.com/uc?id=1O2JQxIFx80y2cEVmbcFTDWv06q-BkGAL"},
        {type:'target',id:13,url:"https://drive.google.com/uc?id=1xEJJXCywdmLpk7cuoykIe-yrI6HnPfk0"},
        {type:'vig',   id:14,url:"https://drive.google.com/uc?id=1vmdGISM86oJVyB5nmQfLtX6obPew7ej2"},
        {type:'target',id:15,url:"https://drive.google.com/uc?id=1HCY32TpYR2Qw1Bh2NbPLIVqjOxC0r-DW"},
        {type:'target',id:16,url:"https://drive.google.com/uc?id=1AjO-9nrQZlvqjzzMzhpVIR9-Q_0QG3ST"},
        {type:'target',id:17,url:"https://drive.google.com/uc?id=1m8UV691rnSJ8ATGlnjPOoW9FQwoftLlz"},
        {type:'vig',   id:18,url:"https://drive.google.com/uc?id=1sjkZb9_V3dabziTOwpTx8nXCAyGqF7sC"},
        {type:'target',id:19,url:"https://drive.google.com/uc?id=1ObjlzgHT_KwOYMjlV6O6cvdI_NcBg81_"},
        {type:'target',id:20,url:"https://drive.google.com/uc?id=1NS2KVxtyYka6GOnHx1uWdGCV8HBGmN3g"},
        {type:'vig',   id:21,url:"https://drive.google.com/uc?id=1I2AEC1lyYzWyYCOMtHy3zxuFA0zkfnZ7"},
        {type:'target',id:22,url:"https://drive.google.com/uc?id=1XCKPSLm8KIzNt2BgiPgOcWygJziHGSiE"},
        {type:'target',id:23,url:"https://drive.google.com/uc?id=1UM4Hy0QGILnkZ9vGunsM34WdlGQFetlb"},
        {type:'target',id:24,url:"https://drive.google.com/uc?id=1s6116zaBUriW2c-jdRUzlqwZLVoa7Q18"},
        {type:'target',id:25,url:"https://drive.google.com/uc?id=1eb7a3XS7ZymONCPjJeRzaTN6S87FsAcD"},
    ]
}

export default function reducer(state = initialState, {type, payload}){
    
    switch(type){
        case CHANGE_VIDEO:
            return{
                ...state,
                newVideo: payload
            };
        
        case CHANGE_TEMPLATE:
            return{
                ...state,
                template: payload
            };

        case REC_VIDEO:
            
            return{
                ...state,
                recVideo: payload
            };
        
        default: return state;
    }
}