ALTER TABLE coach
ADD COLUMN experience INT,      
ADD COLUMN rating DECIMAL(3, 2),  
ADD COLUMN description VARCHAR(400);

ALTER TABLE course
ADD COLUMN type VARCHAR(50) NOT NULL, 
ADD CONSTRAINT fk_course_coach       
FOREIGN KEY (id_coach) REFERENCES coach(id);