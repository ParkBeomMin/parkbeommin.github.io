import{u as $}from"./asyncData.6a18b6b3.js";import{h as k,V as S,K as D,o as n,c as o,F as h,D as b,a as l,s as y,t as c,W as B,X as F,l as N,I as V,M as I,b as K,w as P,e as A}from"./entry.c51e06b1.js";const j={class:"flex mb-8 flex-wrap"},q=["onClick"],J=k({__name:"CategoryFilter",async setup(d){let r,u;const{data:v}=([r,u]=S(async()=>$("category",async()=>await F("/posts/").find())),r=await r,u(),r),m=v.value,g=m==null?void 0:m.flatMap(s=>{var t,a;return(a=(t=s.categories)==null?void 0:t.split)==null?void 0:a.call(t," ")}).filter(s=>s),x=[...new Set(g)],{postState:f,setCategory:p,getPostList:_}=D(),e=s=>f.value.categories.findIndex(t=>t===s)>-1;return(s,t)=>(n(),o("ul",j,[(n(),o(h,null,b(x,(a,i)=>l("li",{key:`category-${i}`,class:B(["mr-3 p-1 px-2 rounded-3xl transition duration-500 hover:scale-125 hover:bg-blue-400 hover:text-white",{"bg-blue-400 text-white":e(a)}])},[l("a",{href:"javascript:void(0)",onClick:w=>(y(p)({category:a}),y(_)())}," #"+c(a),9,q)],2)),64))]))}}),z={class:"font-bold md:text-3xl text-xl"},E={key:0},W={class:"my-8"},X={class:"font-bold md:text-xl"},Y={class:"text-sm"},O=k({__name:"List",props:{title:{type:String,default:""},searchKeyword:{type:String,default:""},limit:{type:Number,default:0},isShowCnt:{type:Boolean,default:!0}},async setup(d){let r,u;const{title:v,searchKeyword:m,limit:g}=d,C=_=>{if(!_)return"";const e=new Date(_),s=e.getMonth()+1<10?`0${e.getMonth()+1}`:e.getMonth()+1,t=e.getDate()<10?`0${e.getDate()}`:e.getDate();return`${e.getFullYear()}-${s}-${t}`},{postState:x,getPostList:f}=D(),p=N(()=>x.value.postList);return[r,u]=S(()=>$("posts",async()=>{})),await r,u(),V(async()=>{await f({limit:g})}),(_,e)=>{const s=A;return n(),o(h,null,[l("h2",z,c(d.title),1),d.isShowCnt?(n(),o("span",E,c(y(p).length)+" 개의 포스트가 있어요.",1)):I("",!0),l("ul",W,[(n(!0),o(h,null,b(y(p),(t,a)=>(n(),o("li",{key:a,class:"mb-4 pb-4 border-b-4 border-grey-900 transition duration-500 hover:text-blue-500 hover:translate-x-1"},[K(s,{to:t._path},{default:P(()=>{var i,w;return[(n(!0),o(h,null,b((w=(i=t.categories)==null?void 0:i.split)==null?void 0:w.call(i," "),(L,M)=>(n(),o("span",{class:"mr-2 text-gray-500 text-sm md:text-md",key:`post-category-${M}`},"#"+c(L),1))),128)),l("h3",X,c(t.title),1),l("p",null,c(t.description),1),l("span",Y,c(C(t.date)),1)]}),_:2},1032,["to"])]))),128))])],64)}}});export{J as _,O as a};
