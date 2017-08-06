$(document).ready(() => {
    $('#buyMarketLvl').click((e) => {
        let data = {
            university: $('#team-select option:selected').text(),
            buyMarketLvl: $('#marketlvl option:selected').val()
        }
        $.ajax({
            type: "POST",
            url: '/marketing',
            data: data,
            success: (res) => {
                // window.location.replace(res.url)
                alert(res)
                console.log(res)
            },
        })
    })
})