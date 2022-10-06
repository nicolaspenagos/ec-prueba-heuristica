document.getElementById("excel_results").onclick = () => {






    // (C1) DUMMY DATA
    var data = [
        ["EMPRESA", "ENCARGADO", "EMAIL", "FECHA REGISTRO", "REPORTE GENERADO", "FECHA REPORTE"]

    ];



    for (let i = 0; i < companiesInfoArray.length; i++) {



        let current = companiesInfoArray[i];
        console.log(current);

        let company = current.company;
        let person = current.name + " " + current.lastName;
        let email = current.email;
        let date1 = current.requestDate;
        let date2 = "";
        let report = "SI";
        if (current.resultsDate) {
            var date = new Date(parseFloat(current.resultsDate));
            var dd = String(date.getDate()).padStart(2, '0');
            var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = date.getFullYear();
            date2 = dd + '/' + mm + '/' + yyyy;

        } else {
            report = "NO";
        }

        let row = [company, person, email, date1, report, date2];
        data.push(row);

    }

    console.log(data);
    // (C2) CREATE NEW EXCEL "FILE"
    var workbook = XLSX.utils.book_new(),
        worksheet = XLSX.utils.aoa_to_sheet(data);
    workbook.SheetNames.push("Reporte");
    workbook.Sheets["Reporte"] = worksheet;

    // (C3) TO BINARY STRING
    var xlsbin = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "binary"
    });

    // (C4) TO BLOB OBJECT
    var buffer = new ArrayBuffer(xlsbin.length),
        array = new Uint8Array(buffer);
    for (var i = 0; i < xlsbin.length; i++) {
        array[i] = xlsbin.charCodeAt(i) & 0XFF;
    }
    var xlsblob = new Blob([buffer], { type: "application/octet-stream" });
    delete array;
    delete buffer;
    delete xlsbin;

    // (C5) "FORCE DOWNLOAD"
    var url = window.URL.createObjectURL(xlsblob),
        anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "Reporte_EC.xlsx";
    anchor.click();
    window.URL.revokeObjectURL(url);
    delete anchor;
};