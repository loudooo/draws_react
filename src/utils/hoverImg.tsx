import { Drawing } from "../interfaces/drawing";

function getInfos(tab: Drawing[], url_to_compare: string): any {
    const format_url_to_compare = url_to_compare.slice(url_to_compare.lastIndexOf('/') + 1);
    let tab_infos: any;
    tab.forEach(element => {
        const url = element.url;
        if (format_url_to_compare == url) {
            console.log("OKKKKK", element.date_creation)
            tab_infos = { date: element.date_creation, title: element.title, medium: element.medium };
            return tab_infos;
        }
    });
    return tab_infos;
}
export function hoverImg(tab: Drawing[], map: Map<any, any>): number {
    const tab_img = document.querySelectorAll("img")
    // console.log(tab_img);
    // console.log(tab);
    // console.log(map);
    // tab_img.forEach(img => {
    //     img.addEventListener("mouseover", function (event) {
    //         // console.log("hover", this)
    //         console.log(this.offsetTop)
    //         this.style.opacity = "0.5";
    //         let tab_infos = getInfos(tab, this.src);
    //         console.log(tab_infos);
    //         let hover_div = document.createElement('div');
    //         hover_div.innerHTML = tab_infos.date;
    //         hover_div.style.backgroundColor = "white";
    //         hover_div.className = "temp_hover_div";
    //         document.body.appendChild(hover_div); 
    //     });
    //     img.addEventListener("mouseout", function (event) {
    //         const tab_temp_hover = document.querySelectorAll('.temp_hover_div');
    //         tab_temp_hover.forEach(element => {
    //             element.remove();
    //         });
    //         console.log("hover", this)
    //         console.log(this.offsetTop)
    //         this.style.opacity = "1"
    //     });
    // });
    tab_img.forEach(img => {
        img.addEventListener("mouseover", function (event) {
            // console.log("hover", this)
            console.log(this.offsetTop, this.offsetLeft)
            this.style.opacity = "0.5";
            let hover_div = document.createElement('div');
            hover_div.innerHTML = this.title;
            hover_div.style.backgroundColor = "white";
            hover_div.style.position = "absolute";
            // hover_div.style.top = this.offsetTop.toString();
            // hover_div.style.left = this.offsetLeft.toString();
            hover_div.style.zIndex = '500';
            hover_div.className = "temp_hover_div";
            document.body.prepend(hover_div);
        });
        img.addEventListener("mouseout", function (event) {
            const tab_temp_hover = document.querySelectorAll('.temp_hover_div');
            tab_temp_hover.forEach(element => {
                element.remove();
            });
            // console.log("hover", this)
            // console.log(this.offsetTop)
            this.style.opacity = "1"
        });
    });
    return 0;
}