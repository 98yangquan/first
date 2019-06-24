var app = new Vue({
    el:"#app",
    data:{
        users:[],
        user:{}
    },
   /* created:function(){

    },*/
    mounted:function(){
        //如果
        this.findUsers();
    },
    methods:{
        findUsers:function(pageNo,pageSize){
            //js promise 解决地狱回调
            var that = this;
            axios.get("findUsers").then(function(response){
                that.$data.users = response.data;
            },function(err){
            });
        },

        // 打开新增的窗口
        showAddDialog : function(){
            $("#myModal-save").modal("show");//让模态框弹出来
        },

        // 保存用户
        saveUser:function(){
            var that = this;
            axios.post("saveUser",that.user).then(function(response){
                if(response.status==200 && response.data == 1) {
                    //成功之后直接刷新页面
                    that.findUsers();
                    // 清空用户对象个，同步视图
                    that.$data.user = {};
                }
            }).catch(function(err){

            })
        },

        showEditDialog:function(opid){
            var that = this;

            axios.get("getUser2?id="+opid).then(function(response){
                that.$data.user = response.data;
                $("#myModal").modal("show");//让模态框弹出来
            },function(err){
            });
        },

        update:function(){
            var that = this;
            axios.post("updateUser",that.user).then(function (res) {
                //成功之后直接刷新页面
                that.findUsers();
            }).catch(function (err) {
                console.log(err)
            });
        },

        del : function(opid,index){
            var flag = confirm("你确定删除吗?");
            if(flag){
                var that = this;
                axios.get("deleteByid/"+opid).then(function(response){
                   /*if(response.status==200 && response.data == 1) {
                        //成功之后直接刷新页面
                        that.findUsers();
                    }*/
                    that.$data.users.splice(index,1);

                }).catch(function(err){
                })
            }
        }
    }
});
