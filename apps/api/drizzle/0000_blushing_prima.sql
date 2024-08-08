DO $$ BEGIN
 CREATE TYPE "public"."goal" AS ENUM('Muscle gain', 'Weight Loss', 'Stay fit');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('Open', 'Closed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."gender" AS ENUM('Male', 'Female');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."level" AS ENUM('Advanced', 'Intermediate', 'Beginner');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."day" AS ENUM('day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."target" AS ENUM('Over Weight', 'Normal', 'Under Weight', 'Obese');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."workouteGoal" AS ENUM('Muscle Gain', 'Stay fit', 'Weight Loss');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."workoutIntensity" AS ENUM('Fast', 'Moderate', 'Slow');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customerFcm" (
	"id" serial PRIMARY KEY NOT NULL,
	"customerID" integer NOT NULL,
	"token" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customer" (
	"id" serial PRIMARY KEY NOT NULL,
	"deviceID" text NOT NULL,
	"device" text DEFAULT 'ios',
	"removeAds" boolean DEFAULT false,
	CONSTRAINT "customer_deviceID_unique" UNIQUE("deviceID")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "enquiryStatusHistory" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" "status" NOT NULL,
	"userID" integer NOT NULL,
	"enquiryID" integer NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "enquiry" (
	"id" serial PRIMARY KEY NOT NULL,
	"organisationID" integer NOT NULL,
	"customerName" text NOT NULL,
	"mobile" varchar(10) NOT NULL,
	"email" text,
	"goal" "goal" DEFAULT 'Stay fit',
	"status" "status" DEFAULT 'Open' NOT NULL,
	"userID" integer,
	"periodInM" integer DEFAULT 6 NOT NULL,
	"terms" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "memberAttendance" (
	"id" serial PRIMARY KEY NOT NULL,
	"memberID" integer NOT NULL,
	"dateAndTime" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "memberWeightHistory" (
	"id" serial PRIMARY KEY NOT NULL,
	"memberID" integer NOT NULL,
	"weight" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "memberPlan" (
	"id" serial PRIMARY KEY NOT NULL,
	"memberID" integer NOT NULL,
	"planID" integer NOT NULL,
	"startDate" timestamp NOT NULL,
	"endDate" timestamp NOT NULL,
	"paid" boolean DEFAULT true,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "memberWorkoutLog" (
	"id" serial PRIMARY KEY NOT NULL,
	"memberID" integer NOT NULL,
	"workoutTemplateDetailID" integer NOT NULL,
	"sets" integer NOT NULL,
	"reps" text NOT NULL,
	"exerciseName" text NOT NULL,
	"completedTime" text NOT NULL,
	"intensity" "workoutIntensity" DEFAULT 'Moderate',
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "member" (
	"id" serial PRIMARY KEY NOT NULL,
	"organisationID" integer NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"userID" integer NOT NULL,
	"joinDate" varchar NOT NULL,
	"quickAdd" boolean DEFAULT false,
	"passcode" varchar(255) NOT NULL,
	"age" integer,
	"address" text,
	"mobile" text,
	"height" integer,
	"weight" integer,
	"emergencyContact" text,
	"gender" "gender" DEFAULT 'Male',
	"profilePic" text,
	"active" boolean DEFAULT true,
	"workoutTemplateID" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "menu" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"icon" text NOT NULL,
	"link" text NOT NULL,
	"active" boolean DEFAULT true,
	"parent" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"body" text NOT NULL,
	"imageUrl" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organisation" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"emailVerified" boolean DEFAULT true,
	"active" boolean DEFAULT true,
	"mobile" text,
	"logo" text DEFAULT '' NOT NULL,
	"panelName" text DEFAULT 'Admin' NOT NULL,
	"darkMode" boolean DEFAULT true,
	"theme" text DEFAULT 'default',
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "permission" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "rolePermission" (
	"id" serial PRIMARY KEY NOT NULL,
	"permission" text NOT NULL,
	"menuName" text NOT NULL,
	"roleID" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "plan" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"amount" integer NOT NULL,
	"periodInMonths" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "role" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"organisationID" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "systemConfig" (
	"id" serial PRIMARY KEY NOT NULL,
	"logo" text NOT NULL,
	"panelName" text NOT NULL,
	"darkMode" boolean DEFAULT true,
	"theme" text DEFAULT 'default',
	"organisationID" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userBookmark" (
	"id" serial PRIMARY KEY NOT NULL,
	"link" text NOT NULL,
	"userID" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userRole" (
	"id" serial PRIMARY KEY NOT NULL,
	"roleID" integer NOT NULL,
	"userID" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"active" boolean DEFAULT true,
	"organisationID" integer NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bodyPart" (
	"id" serial PRIMARY KEY NOT NULL,
	"organisationID" integer NOT NULL,
	"name" text NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "exerciseBody" (
	"id" serial PRIMARY KEY NOT NULL,
	"exerciseID" integer NOT NULL,
	"bodyPartID" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "exercise" (
	"id" serial PRIMARY KEY NOT NULL,
	"organisationID" integer NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"level" "level" NOT NULL,
	"referenceURL" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workoutTemplateDetail" (
	"id" serial PRIMARY KEY NOT NULL,
	"workoutTemplateID" integer NOT NULL,
	"exerciseID" integer NOT NULL,
	"set" integer NOT NULL,
	"reps" text,
	"restBwRepsInS" integer NOT NULL,
	"timeInM" integer,
	"additionInstruction" text,
	"day" "day" DEFAULT 'day1' NOT NULL,
	"dayName" text NOT NULL,
	"approxCalorieBurn" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workoutTemplate" (
	"id" serial PRIMARY KEY NOT NULL,
	"organisationID" integer NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"target" "target" DEFAULT 'Normal',
	"intensity" "workoutIntensity" DEFAULT 'Moderate',
	"approxTimeToCompleteInM" integer DEFAULT 45,
	"workoutGoal" "workouteGoal" DEFAULT 'Stay fit',
	"active" boolean DEFAULT true
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "customerFcm" ADD CONSTRAINT "customerFcm_customerID_customer_id_fk" FOREIGN KEY ("customerID") REFERENCES "public"."customer"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "enquiryStatusHistory" ADD CONSTRAINT "enquiryStatusHistory_userID_user_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "enquiryStatusHistory" ADD CONSTRAINT "enquiryStatusHistory_enquiryID_enquiry_id_fk" FOREIGN KEY ("enquiryID") REFERENCES "public"."enquiry"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "enquiry" ADD CONSTRAINT "enquiry_organisationID_organisation_id_fk" FOREIGN KEY ("organisationID") REFERENCES "public"."organisation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "enquiry" ADD CONSTRAINT "enquiry_userID_user_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "memberAttendance" ADD CONSTRAINT "memberAttendance_memberID_member_id_fk" FOREIGN KEY ("memberID") REFERENCES "public"."member"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "memberWeightHistory" ADD CONSTRAINT "memberWeightHistory_memberID_member_id_fk" FOREIGN KEY ("memberID") REFERENCES "public"."member"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "memberPlan" ADD CONSTRAINT "memberPlan_memberID_member_id_fk" FOREIGN KEY ("memberID") REFERENCES "public"."member"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "memberPlan" ADD CONSTRAINT "memberPlan_planID_plan_id_fk" FOREIGN KEY ("planID") REFERENCES "public"."plan"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "memberWorkoutLog" ADD CONSTRAINT "memberWorkoutLog_memberID_member_id_fk" FOREIGN KEY ("memberID") REFERENCES "public"."member"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "memberWorkoutLog" ADD CONSTRAINT "memberWorkoutLog_workoutTemplateDetailID_workoutTemplateDetail_id_fk" FOREIGN KEY ("workoutTemplateDetailID") REFERENCES "public"."workoutTemplateDetail"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "member" ADD CONSTRAINT "member_organisationID_organisation_id_fk" FOREIGN KEY ("organisationID") REFERENCES "public"."organisation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "member" ADD CONSTRAINT "member_workoutTemplateID_workoutTemplate_id_fk" FOREIGN KEY ("workoutTemplateID") REFERENCES "public"."workoutTemplate"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rolePermission" ADD CONSTRAINT "rolePermission_roleID_role_id_fk" FOREIGN KEY ("roleID") REFERENCES "public"."role"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "role" ADD CONSTRAINT "role_organisationID_organisation_id_fk" FOREIGN KEY ("organisationID") REFERENCES "public"."organisation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "systemConfig" ADD CONSTRAINT "systemConfig_organisationID_organisation_id_fk" FOREIGN KEY ("organisationID") REFERENCES "public"."organisation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userBookmark" ADD CONSTRAINT "userBookmark_userID_user_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userRole" ADD CONSTRAINT "userRole_roleID_role_id_fk" FOREIGN KEY ("roleID") REFERENCES "public"."role"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userRole" ADD CONSTRAINT "userRole_userID_user_id_fk" FOREIGN KEY ("userID") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user" ADD CONSTRAINT "user_organisationID_organisation_id_fk" FOREIGN KEY ("organisationID") REFERENCES "public"."organisation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bodyPart" ADD CONSTRAINT "bodyPart_organisationID_organisation_id_fk" FOREIGN KEY ("organisationID") REFERENCES "public"."organisation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exerciseBody" ADD CONSTRAINT "exerciseBody_exerciseID_exercise_id_fk" FOREIGN KEY ("exerciseID") REFERENCES "public"."exercise"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exerciseBody" ADD CONSTRAINT "exerciseBody_bodyPartID_bodyPart_id_fk" FOREIGN KEY ("bodyPartID") REFERENCES "public"."bodyPart"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "exercise" ADD CONSTRAINT "exercise_organisationID_organisation_id_fk" FOREIGN KEY ("organisationID") REFERENCES "public"."organisation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workoutTemplateDetail" ADD CONSTRAINT "workoutTemplateDetail_workoutTemplateID_workoutTemplate_id_fk" FOREIGN KEY ("workoutTemplateID") REFERENCES "public"."workoutTemplate"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workoutTemplateDetail" ADD CONSTRAINT "workoutTemplateDetail_exerciseID_exercise_id_fk" FOREIGN KEY ("exerciseID") REFERENCES "public"."exercise"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workoutTemplate" ADD CONSTRAINT "workoutTemplate_organisationID_organisation_id_fk" FOREIGN KEY ("organisationID") REFERENCES "public"."organisation"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "orgEmailIdx" ON "organisation" USING btree ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "roleIdx" ON "rolePermission" USING btree ("roleID");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "emailIdx" ON "user" USING btree ("email");