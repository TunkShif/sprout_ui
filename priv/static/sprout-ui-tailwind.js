"use strict";var c=require("tailwindcss/plugin"),n=["open","closed","checked","unchecked","on","off"];module.exports=c.withOptions(({prefix:t="ui"}={})=>({addVariant:o})=>{n.forEach(e=>{o(`${t}-${e}`,[`&[data-state~="${e}"]`,`:where([data-state~="${e}"]) &`])})});
