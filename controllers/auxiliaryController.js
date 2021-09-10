const auxiliaryController = {

    /**
     * convertDate
     * 
     * Converts a Date object to its String counterpart in the format 'yyyy-mm-dd'
     * @param {*} date 
     * @returns String 'yyyy-mm-dd'
     */
    convertDate: function(date) {
        year = date.getFullYear() 
        month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
        day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
        date = year+'-'+month+'-'+day;

        return date;
    },

    /**
     * convertDate2
     * 
     * Converts a Date object to its String counterpart in the format 'month dd, yyyy'
     * @param {*} date 
     * @returns String 'month dd, yyyy'
     */
    convertDate2: function(date) {
        const months = ["January", "February", "March", "April", "May", "June", 
                            "July", "August", "September", "October", "November", "December"];

        date =  months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
        return date;
    },

    /**
     * escapeRegex
     * 
     * A small security measure to avoid common DDOS attacks that can potentially
     * overload and crash the database.
     * @param {*} text search query of the user to apply the function to.
     * @returns 
     */
    escapeRegex: function(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    },

    /**
     * paginatedResults
     * 
     * paginates a collection.
     * @param {*} model the Model to be paginated
     * @param {*} filter the filter for finding the model
     * @param {*} page the page to access
     * @param {*} limit the number of results to return per page.
     * @returns 
     */
    paginatedResults: async function(model, filter, page, limit, sortFilter) {
        let startIndex = (page - 1) * limit;
        let endIndex = page * limit;
        let results = {}
        
        if (endIndex < await model.countDocuments(filter).exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }
        
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }

        try {
            results.results = await model.find(filter)
            .collation({'locale':'en'})
            .sort(sortFilter)
            .lean()
            .limit(limit)
            .skip(startIndex)
            .exec()

            return results;
        } catch (e) {
            console.log(e.message);
        }
    },
}

module.exports = auxiliaryController