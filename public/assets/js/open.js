!function(){for(var e=document.querySelectorAll(".monitors.has-children"),t=0;t<e.length;++t)e[t].addEventListener("click",function(e){var t=this.classList,n=this.querySelector(".monitors-content-wrap");t.contains("open")?(t.remove("open"),n.style.maxHeight=0):(t.add("open"),n.style.maxHeight=this.querySelector(".monitors-content").clientHeight+"px")})}();