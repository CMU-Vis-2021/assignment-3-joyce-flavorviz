import{s as d,c as x,l as A,o as k,p as w,a as L,b as $,d as m}from"./vendor.4e618d8b.js";const O=function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&c(r)}).observe(document,{childList:!0,subtree:!0});function l(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function c(e){if(e.ep)return;e.ep=!0;const o=l(e);fetch(e.href,o)}};O();const s={top:30,right:10,bottom:10,left:0},f=1500-s.left-s.right,p=400-s.top-s.bottom,y=d("#d3-div").append("svg").attr("width",f+s.left+s.right).attr("height",p+s.top+s.bottom).append("g").attr("transform",`translate(${s.left},${s.top})`);x("data/wo_outliers_percent.csv").then(function(a){console.log(a);let i=Object.keys(a[0]).filter(function(t){return t!="ingredients"&&t!="mostcommon"});console.log(i);const l={};for(var c in i)name=i[c],l[name]=A().domain([.1,10]).range([p,0]);const e=k().domain(i).range(["#0F0A0Aff","#2292A4FF","#BDBF09ff","#D96C06FF","#D30C7BFF","#F42C04FF","#D67AB1FF"]);console.log("test"),console.log(e("russian"));var o=w().range([0,f]).padding(1).domain(i);const r=d("#d3-div").append("div").style("opacity",0).attr("class","tooltip").style("background-color","white").style("border","solid").style("border-width","1px").style("border-radius","5px").style("padding","10px"),g=function(t,n){r.style("opacity",1).html(`ingredient: ${n.ingredients} <br> most common in ${n.mostcommon} recipes`)},h=function(t,n){r.style("opacity",1).html(`ingredient: ${n.ingredients} <br> most common in ${n.mostcommon} recipes`).style("left",t.x/2+"px").style("top",t.y/2+"px")},v=function(t,n){r.transition().duration(200).style("opacity",0)};function b(t){return $()(i.map(function(n){return[o(n),l[n](t[n])]}))}y.selectAll("myPath").data(a).join("path").attr("class",function(t){return"line "+t.mostcommon}).attr("d",b).style("fill","none").style("stroke",function(t){return e(t.mostcommon)}).style("opacity",.5).on("mouseover",g).on("mousemove",h).on("mouseleave",v);const F=function(t,n){console.log(n);const u=n;n!="all"?(m(".line").transition().duration(200).style("stroke","lightgrey").style("opacity","0.2"),m("."+u).transition().duration(200).style("stroke",e(u)).style("opacity","1")):m(".line").transition().duration(200).style("opacity","0.2")};y.selectAll("myAxis").data(i).enter().append("g").attr("transform",function(t){return"translate("+o(t)+")"}).each(function(t){d(this).call(L().scale(l[t]))}).append("text").style("text-anchor","middle").attr("y",-9).text(function(t){return t}).style("fill","black").on("click",F)});