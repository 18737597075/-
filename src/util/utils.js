import React from 'react'

export default {
    formateDate(time){
        if(!time){
            return '';
        }
        let date = new Date(time);
        return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() +' '+ date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    },
    pagination(data,callback){
        return {
            onChange:(current)=>{
                callback(current)
            },
            current:data.result.page,
            pageSize:data.result.page_size,
            total:data.result.total,
            showTotall:()=>{
                return `共${data.result.list.total}条`
            },
        }
    },
    getOptionList(data){
        if(!data){
            return [];
        }
        let options = []
        data.map((item)=>{
            options.push(<option value={item.id} key={item.id}>{item.name}</option>)
        })
        return options;
    },
    updateSelectedItem(selectedRowKeys,selectedItem,selectedIds){
        if(selectedIds){
            this.setState({
                selectedRowKeys,
                selectedItem,
                selectedIds
            })
        }else{
            this.setState({
                selectedRowKeys,
                selectedItem
            })
        }
    }
}