
export const utils = {
   
    convertToDate: (timestamp) => { 
        console.log(timestamp);
        
        var ts = new Date(Number(timestamp) * 1000);
    
        const date = ts.toLocaleString();
        console.log(date);

        return date;
    },

}
