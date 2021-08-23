
function endpoint(url){   // data memento
    let string2 = url.slice(72);
    var asset = "";
    for (let i = 0; i < string2.length; i++) {
        if (string2[i] !== "?") {
            asset += string2[i];
        }
        else {
            return asset.slice(29);
        }
    }
}

console.log(endpoint("https://tekal-dashboard-asset-input.s3.amazonaws.com/memory-game-active/video/dataset-memento/videos/ascending_flickr_R-7-6-1-2-7-7-8-9-9676127789_16.mp4?AWSAccessKeyId=ASIA27M5RUA5GMIKLL6B&Signature=x6dvHAimlHop8a5Lox%2Bk%2FCBwQF0%3D&x-amz-security-token=IQoJb3JpZ2luX2VjENP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIAOrBZxTpjlXJtKycCAt3Ei%2BX%2Fs%2FqYpJKeVztucwq1REAiAGRKP6v%2FqaTgRE%2FJfjzGc8wWw8iMYIcoiECRQEKXM8qyqmAgj8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAEaDDc1NDYzNDAzOTM1NCIMKzIur%2B47DI7Bv0WJKvoBX39zmw2iYaRtG7D4%2BpgB6jKIbMAYYldIafnKn88rtg97FSj9psiyzwCkNsYb7bhFGDFZVW1J9R9nOVvnl9eC59YDAnvpEgf6%2FkcDIr0YyWOSN0dwWPgB283GBQpsvX1%2BNuS8DUuHALqHqvY%2FzftPdi5ytV6cZ%2FMznKJ4w%2F4PcxRykFWrg4jlRYQPbA9kZ7AjDLbfvMZKuTaBO52Pjz2Hk%2FSDSCgRnXtd1Bqi5xNbw8gZ4EbaBeuUidFxIigBzMkGyVm%2Bv%2BnN%2FTYu3kWcS2akQoOY8P951f%2BVqKqH4H7vDmRrj1Y%2B6H3Uadp4I6PwZJAwVV7%2FYgCepv6xhjCMmIyJBjqbAR5SMtqft772N0Qj7vlWa7%2Fihb%2FNEjm1AM18eS9FM04rTvBfBch%2BicX3ADpi9JddfSSfYUUZgszNY8m%2B7JgIZWe2DDxfi9uH8nt982bKqnpW%2FV0SWIrlhvdeRgMYzd8X3diK%2FHAmoZbnwu9F5oYQcTDw2D2NI72ngyIviMfQksAZQUG%2FyCTx52d%2BenFbfJTClWNxq3IXT01K5RBx&Expires=1629690917"))

function endpointNoMemento(url){ 
    let string2 = url.slice(78);
    var asset = "";
    for (let i = 0; i < string2.length; i++) {
        if (string2[i] !== "?") {
            asset += string2[i];
        }else{
            return asset;
        } 
    }
}
        


module.exports = {endpoint, endpointNoMemento};