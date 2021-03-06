import { Component } from '@angular/core';
@Component({
    template: `
    <h5>Capture Options</h5>
    <div><button (click)="mediaCapt('image')">Media Capture Image</button><br/></div><br/>
    <div><button (click)="mediaCapt('video')">Media Capture Video</button><br/></div><br/>
    <div></div><br/>
    <h4>All Media List</h4>
    <div id="captureList"></div><br/>
    <router-outlet></router-outlet>
    `
})

/*
-------- working lines --------
<div id="imageFile"><img alt="test image"/></div><br/>
    <div></div><br/>
    <div id="videoFile">
        <video controls muted> <source src="" type="video/mp4"> </video>
    </div><br/>
    <button (click)="selectFromDemo()">select From Demo</button> <br/>

-------- code while trying different things --------
<video width="320" height="240" controls muted>
<video class="video_player" id="player" width="100%" controls="controls" autoplay="autoplay">
<button onclick="goFullscreen('player'); return false">Fullscreen!</button>

<script type="text/javascript">
        function goFullscreen(id) {
            var element = document.getElementById(id);       
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullScreen) {
                element.webkitRequestFullScreen();
            }  
        }
    </script> 
*/

export class ListComponent {
    
    database = null;
    constructor(){
        //this.showList = this.showList.bind(this);
        this.initDatabase();
        this.showList(this.database);
    }

    displayVideo(fullPath) {
        document.getElementById("videoFile").getElementsByTagName("video")[0].src = fullPath ;
    }

    mediaCapt(selection){
        //var func = this.displayImage;
        var funcVid = this.displayVideo;
        var funcAddRecords = this.addRecords;
        var funcShowList = this.showList;
        var db = this.database;

        if (selection == "image"){
            navigator.device.capture.captureImage(function captureSuccess(mediaFiles) {
                        var i, len;
                        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                            funcAddRecords(mediaFiles[i], 'image', false, db);
                        }
                        funcShowList(db);
            },
            function captureError(error){
                console.debug("Unable to obtain picture: " + error, "app");
            },{limit:2});
            // this limit is deliberately set to 2 to test single record insert
        }
    
        if (selection == "video"){
            navigator.device.capture.captureVideo(function captureSuccess(mediaFiles){
                //console.debug("test mediaFiles: " + mediaFiles[0].fullPath, " app");
                //funcVid(mediaFiles[0].fullPath);
                var i, len;
                for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                    funcAddRecords(mediaFiles[i], 'video', false, db);
                }
                funcShowList(db);
            },
            function captureError(error){
                console.debug("Unable to obtain picture: " + error, "app");
            },{limit:2});
        }
    }

    // database helper
    initDatabase() {
        this.database = window.sqlitePlugin.openDatabase({name: 'sample.db', location: 'default'
                                , androidDatabaseImplementation: 2});

        this.database.transaction(function(transaction) {
            transaction.executeSql('CREATE TABLE MediaList (name, path, type, upload)');
        });

        // showCount
        this.database.transaction(function(transaction) {
            transaction.executeSql('SELECT count(*) AS recordCount FROM MediaList', [], function(ignored, resultSet) {
                console.debug('RECORD COUNT: ' + resultSet.rows.item(0).recordCount);
            });
        }, function(error) {
            console.debug('SELECT count error: ' + error);
        });
    }

    // Using recommended API calls
    addRecords(medfl, type, upload, db){ 
        var name = medfl.name;
        var path = medfl.fullPath;

        // this.database.sqlBatch([
        //     'CREATE TABLE IF NOT EXISTS MediaList (name, path, type, upload)',
        //     [ 'INSERT INTO MediaList VALUES (?,?,?,?)', [name, path, type, upload] ],
        //   ], function() {
        //     console.log('add record OK');
        //   }, function(error) {
        //     console.log('SQL batch ERROR: ' + error.message);
        //   });

        db.transaction(function (tx) {

            var query = "INSERT INTO MediaList (name, path, type, upload) VALUES (?,?,?,?)";
    
            tx.executeSql(query, [name, path, type, upload], function(tx, res) {
                console.log('add record OK');
            },
            function(tx, error) {
                console.log('INSERT error: ' + error.message);
            });
        }, function(error) {
            console.log('transaction error: ' + error.message);
        }, function() {
            console.log('transaction ok');
        });
    }

    selectFromDemo(){
        this.database.executeSql('SELECT * FROM MediaList', [], function(rs) {
            for(let i=0; i<rs.rows.length; i++){
                console.log('Record ' + i + ' => name: ' + rs.rows.item(i).name 
                + ' path: ' + rs.rows.item(i).path + ' type: ' + rs.rows.item(i).type
                + ' upload: ' + rs.rows.item(i).upload);
            }
          }, function(error) {
            console.log('SELECT SQL statement ERROR: ' + error.message);
          });
    }

    showList(db){
        var cl = "";
        db.executeSql('SELECT * FROM MediaList', [], function(rs) {
            cl += "<ul>";
            for(let i=0; i<rs.rows.length; i++){
                cl += '<li>' + rs.rows.item(i).name + '</li>';
                /*cl += '<li><div> Record ' + i + ' => name: ' + rs.rows.item(i).name 
                + ' path: ' + rs.rows.item(i).path + ' type: ' + rs.rows.item(i).type
                + ' upload: ' + rs.rows.item(i).upload + '</div></li>';*/
                // cl += '<li><div>' + rs.rows.item(i).name + ' [' + rs.rows.item(i).type + ']';

                // cl += '<a [routerLink]="[\'database\']"> | View</a>' + '</div></li>';
                // cl += '<a routerLink="/database" routerLinkActive="active"> | View</a>' + '</div></li>';
            }
            cl += '</ul>';
            document.getElementById("captureList").innerHTML = cl;
          }, function(error) {
            console.log('SELECT SQL statement ERROR: ' + error.message);
          });
    }
}