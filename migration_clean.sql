-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'employee', 'agent', 'student');

-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('active', 'inactive', 'blocked');

-- CreateEnum
CREATE TYPE "NeetStatus" AS ENUM ('qualified', 'not_qualified');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('applied', 'shortlisted', 'accepted', 'rejected');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "email_verified_at" TIMESTAMP(3),
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'employee',
    "phone" TEXT,
    "photo_name" TEXT,
    "photo_path" TEXT,
    "designation" TEXT,
    "description" TEXT,
    "remember_token" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "otp" VARCHAR(6),
    "otp_expire_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "institute_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "institute_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provinces" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "provinces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "province_id" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "levels" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "levels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "facilities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "icon_name" TEXT,
    "icon_path" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "facilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hospitals" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "city" TEXT,
    "state" TEXT,
    "beds" INTEGER,
    "established_year" INTEGER,
    "accreditation" TEXT,
    "image_name" TEXT,
    "image_path" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "hospitals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "universities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "thumbnail_name" TEXT,
    "thumbnail_path" TEXT,
    "brochure_name" TEXT,
    "brochure_path" TEXT,
    "embassy_letter_path" TEXT,
    "university_license_path" TEXT,
    "aggregation_letter_path" TEXT,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "city" TEXT,
    "state" TEXT,
    "rating" DECIMAL(3,2),
    "established_year" INTEGER,
    "scholarship_name" TEXT,
    "scholarship_amount" VARCHAR(50),
    "seats_available" INTEGER,
    "students" INTEGER,
    "tuition_fee" DECIMAL(12,2),
    "approved_by" JSONB,
    "shortnote" TEXT,
    "fmge_pass_rate" DECIMAL(5,2),
    "course_duration" TEXT,
    "medium_of_instruction" TEXT,
    "eligibility" TEXT,
    "neet_requirement" TEXT,
    "about_note" TEXT,
    "international_recognition" VARCHAR(50),
    "english_medium" VARCHAR(50),
    "diverse_community" VARCHAR(50),
    "section2_image" TEXT,
    "section2_title" TEXT,
    "section2_text" TEXT,
    "year_of_excellence" INTEGER,
    "countries_represented" INTEGER,
    "global_ranking" INTEGER,
    "campus_area" TEXT,
    "labs" INTEGER,
    "lecture_hall" INTEGER,
    "hostel_building" INTEGER,
    "parent_satisfaction" DECIMAL(5,2),
    "total_reviews" INTEGER,
    "recommended_rate" DECIMAL(5,2),
    "embassy_verified" BOOLEAN NOT NULL DEFAULT false,
    "who_listed" BOOLEAN NOT NULL DEFAULT false,
    "nmc_approved" BOOLEAN NOT NULL DEFAULT false,
    "ministry_licensed" BOOLEAN NOT NULL DEFAULT false,
    "faimer_listed" BOOLEAN NOT NULL DEFAULT false,
    "mci_recognition" BOOLEAN NOT NULL DEFAULT false,
    "ecfmg_eligible" BOOLEAN NOT NULL DEFAULT false,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "home_view" BOOLEAN NOT NULL DEFAULT false,
    "institute_type_id" INTEGER,
    "province_id" INTEGER,
    "city_id" INTEGER,
    "created_by" INTEGER,
    "updated_by" INTEGER,
    "meta_title" TEXT,
    "meta_keyword" TEXT,
    "meta_description" TEXT,
    "og_image_path" TEXT,
    "seo_rating" DECIMAL(2,1),
    "review_number" INTEGER,
    "best_rating" DECIMAL(2,1),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "universities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "university_programs" (
    "id" SERIAL NOT NULL,
    "program_name" TEXT NOT NULL,
    "program_slug" TEXT NOT NULL,
    "duration" TEXT,
    "level_id" INTEGER,
    "study_mode" TEXT,
    "total_fee" DECIMAL(12,2),
    "total_tuition_fee" DECIMAL(12,2),
    "annual_tuition_fee" DECIMAL(12,2),
    "currency" VARCHAR(10) NOT NULL DEFAULT 'INR',
    "application_deadline" TEXT,
    "intake" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 1,
    "overview" TEXT,
    "eligibility" TEXT,
    "medium_of_instruction" TEXT,
    "recognition" TEXT,
    "why_choose_vietnam" TEXT,
    "additional_information" TEXT,
    "year1_syllabus" TEXT,
    "year2_syllabus" TEXT,
    "year3_syllabus" TEXT,
    "year4_syllabus" TEXT,
    "year5_syllabus" TEXT,
    "year6_syllabus" TEXT,
    "university_id" INTEGER NOT NULL,
    "meta_title" TEXT,
    "meta_keyword" TEXT,
    "meta_description" TEXT,
    "og_image_path" TEXT,
    "seo_rating" DECIMAL(2,1),
    "review_number" INTEGER,
    "best_rating" DECIMAL(2,1),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "university_programs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "university_photos" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "image_name" TEXT,
    "image_path" TEXT,
    "position" INTEGER NOT NULL DEFAULT 1,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "university_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "university_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "university_rankings" (
    "id" SERIAL NOT NULL,
    "ranking_body" TEXT NOT NULL,
    "rank" TEXT,
    "year" INTEGER,
    "category" TEXT,
    "score" DECIMAL(5,2),
    "position" INTEGER NOT NULL DEFAULT 1,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "university_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "university_rankings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "university_students" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "country" TEXT,
    "country_iso_code" VARCHAR(5),
    "number_of_students" INTEGER,
    "course" TEXT,
    "year" TEXT,
    "image_name" TEXT,
    "image_path" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "university_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "university_students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "university_fmge_rates" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "appeared" INTEGER,
    "passed" INTEGER,
    "pass_percentage" DECIMAL(5,2),
    "acceptance_rate" DECIMAL(5,2),
    "yoy_change" VARCHAR(20),
    "first_attempt_pass_rate" DECIMAL(5,2),
    "rank" INTEGER,
    "notes" TEXT,
    "source" TEXT,
    "position" INTEGER NOT NULL DEFAULT 1,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "university_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "university_fmge_rates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "university_intakes" (
    "id" SERIAL NOT NULL,
    "intake_month" TEXT NOT NULL,
    "intake_year" INTEGER NOT NULL,
    "application_start" DATE,
    "application_deadline" DATE,
    "classes_start" DATE,
    "seats" INTEGER,
    "status_text" TEXT,
    "notes" TEXT,
    "position" INTEGER NOT NULL DEFAULT 1,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "university_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "university_intakes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "university_testimonials" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT,
    "country" TEXT,
    "course" TEXT,
    "year" TEXT,
    "description" TEXT,
    "rating" DECIMAL(2,1),
    "image_name" TEXT,
    "image_path" TEXT,
    "video_url" TEXT,
    "position" INTEGER NOT NULL DEFAULT 1,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "university_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "university_testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "university_reviews" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT,
    "country" TEXT,
    "course" TEXT,
    "year" TEXT,
    "description" TEXT,
    "rating" DECIMAL(2,1),
    "image_name" TEXT,
    "image_path" TEXT,
    "position" INTEGER NOT NULL DEFAULT 1,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "university_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "university_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "university_faqs" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 1,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "university_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "university_faqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "university_facilities" (
    "id" SERIAL NOT NULL,
    "university_id" INTEGER NOT NULL,
    "facility_id" INTEGER NOT NULL,
    "description" TEXT,
    "image_name" TEXT,
    "image_path" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "university_facilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "university_hospitals" (
    "id" SERIAL NOT NULL,
    "university_id" INTEGER NOT NULL,
    "hospital_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "university_hospitals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "university_links" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT,
    "position" INTEGER NOT NULL DEFAULT 1,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "university_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "university_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scholarships" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "scholarship_type" TEXT,
    "amount_min" DECIMAL(10,2),
    "amount_max" DECIMAL(10,2),
    "discount_percentage" INTEGER,
    "deadline" DATE,
    "available_seats" INTEGER,
    "program" TEXT,
    "application_mode" TEXT,
    "eligibility" JSONB,
    "coverage" JSONB,
    "shortnote" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "university_id" INTEGER,
    "meta_title" TEXT,
    "meta_keyword" TEXT,
    "meta_description" TEXT,
    "og_image_path" TEXT,
    "seo_rating" DECIMAL(2,1),
    "review_number" INTEGER,
    "best_rating" DECIMAL(2,1),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "scholarships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scholarship_faqs" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 1,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "scholarship_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "scholarship_faqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "image_name" TEXT,
    "image_path" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "meta_title" TEXT,
    "meta_keyword" TEXT,
    "meta_description" TEXT,
    "og_image_path" TEXT,
    "seo_rating" DECIMAL(2,1),
    "review_number" INTEGER,
    "best_rating" DECIMAL(2,1),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blogs" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "author_id" INTEGER NOT NULL,
    "title" TEXT,
    "slug" TEXT,
    "shortnote" TEXT,
    "description" TEXT,
    "thumbnail_name" VARCHAR(200),
    "thumbnail_path" TEXT,
    "image_name" VARCHAR(200),
    "image_path" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "home_view" BOOLEAN NOT NULL DEFAULT false,
    "trending" BOOLEAN NOT NULL DEFAULT false,
    "meta_title" TEXT,
    "meta_keyword" TEXT,
    "meta_description" TEXT,
    "og_image_path" TEXT,
    "seo_rating" DECIMAL(2,1),
    "review_number" INTEGER,
    "best_rating" DECIMAL(2,1),
    "schema" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_contents" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_name" TEXT,
    "image_path" TEXT,
    "position" INTEGER NOT NULL DEFAULT 1,
    "blog_id" INTEGER NOT NULL,
    "parent_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_contents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blog_faqs" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 1,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "blog_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_faqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news_categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "image_name" TEXT,
    "image_path" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "meta_title" TEXT,
    "meta_keyword" TEXT,
    "meta_description" TEXT,
    "og_image_path" TEXT,
    "seo_rating" DECIMAL(2,1),
    "review_number" INTEGER,
    "best_rating" DECIMAL(2,1),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "news_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "author_id" INTEGER NOT NULL,
    "title" TEXT,
    "slug" TEXT,
    "shortnote" TEXT,
    "description" TEXT,
    "thumbnail_name" VARCHAR(200),
    "thumbnail_path" TEXT,
    "image_name" VARCHAR(200),
    "image_path" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "home_view" BOOLEAN NOT NULL DEFAULT false,
    "trending" BOOLEAN NOT NULL DEFAULT false,
    "meta_title" TEXT,
    "meta_keyword" TEXT,
    "meta_description" TEXT,
    "og_image_path" TEXT,
    "seo_rating" DECIMAL(2,1),
    "review_number" INTEGER,
    "best_rating" DECIMAL(2,1),
    "schema" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "news_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news_contents" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_name" TEXT,
    "image_path" TEXT,
    "position" INTEGER NOT NULL DEFAULT 1,
    "news_id" INTEGER NOT NULL,
    "parent_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "news_contents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news_faqs" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 1,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "news_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "news_faqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article_categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "image_name" TEXT,
    "image_path" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "meta_title" TEXT,
    "meta_keyword" TEXT,
    "meta_description" TEXT,
    "og_image_path" TEXT,
    "seo_rating" DECIMAL(2,1),
    "review_number" INTEGER,
    "best_rating" DECIMAL(2,1),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "article_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "articles" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER NOT NULL,
    "author_id" INTEGER NOT NULL,
    "title" TEXT,
    "slug" TEXT,
    "shortnote" TEXT,
    "description" TEXT,
    "thumbnail_name" VARCHAR(200),
    "thumbnail_path" TEXT,
    "image_name" VARCHAR(200),
    "image_path" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "home_view" BOOLEAN NOT NULL DEFAULT false,
    "trending" BOOLEAN NOT NULL DEFAULT false,
    "meta_title" TEXT,
    "meta_keyword" TEXT,
    "meta_description" TEXT,
    "og_image_path" TEXT,
    "seo_rating" DECIMAL(2,1),
    "review_number" INTEGER,
    "best_rating" DECIMAL(2,1),
    "schema" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article_contents" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_name" TEXT,
    "image_path" TEXT,
    "position" INTEGER NOT NULL DEFAULT 1,
    "article_id" INTEGER NOT NULL,
    "parent_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "article_contents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article_faqs" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 1,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "article_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "article_faqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "leads" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" VARCHAR(15),
    "city" TEXT,
    "state" TEXT,
    "source" TEXT,
    "source_path" TEXT,
    "password" TEXT,
    "email_verified_at" TIMESTAMP(3),
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "otp" VARCHAR(6),
    "otp_expire_at" TIMESTAMP(3),
    "otp_expiry" TIMESTAMP(3),
    "remember_token" TEXT,
    "status" "LeadStatus" NOT NULL DEFAULT 'active',
    "phone_code" TEXT,
    "country" TEXT,
    "interested_university" TEXT,
    "interested_program" TEXT,
    "father_name" VARCHAR(100),
    "father_mobile" VARCHAR(100),
    "mother_name" VARCHAR(100),
    "mother_mobile" VARCHAR(100),
    "first_language" VARCHAR(100),
    "country_of_citizenship" VARCHAR(100),
    "gender" VARCHAR(100),
    "home_contact_number" VARCHAR(100),
    "country_of_education" VARCHAR(100),
    "highest_level_of_education" VARCHAR(100),
    "grading_scheme" VARCHAR(100),
    "grade_average" VARCHAR(100),
    "english_exam_type" VARCHAR(100),
    "date_of_exam" VARCHAR(100),
    "listening_score" VARCHAR(100),
    "reading_score" VARCHAR(100),
    "writing_score" VARCHAR(100),
    "speaking_score" VARCHAR(100),
    "neet_qualification_status" "NeetStatus",
    "neet_score" INTEGER,
    "date_of_birth" DATE,
    "lead_type" TEXT,
    "lead_status" TEXT,
    "sub_status" TEXT,
    "assigned_to" INTEGER,
    "note" TEXT,
    "ip_address" TEXT,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lead_inquiries" (
    "id" SERIAL NOT NULL,
    "lead_id" INTEGER NOT NULL,
    "university_id" INTEGER,
    "university_name" TEXT,
    "scholarship_id" INTEGER,
    "message" TEXT,
    "source" TEXT DEFAULT 'website',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "agent_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lead_inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_schools" (
    "id" SERIAL NOT NULL,
    "lead_id" INTEGER NOT NULL,
    "level_of_education" TEXT,
    "country_of_education" TEXT,
    "institution_name" TEXT,
    "primary_language" TEXT,
    "attendance_start" DATE,
    "attendance_end" DATE,
    "degree_awarded" BOOLEAN,
    "grading_scheme" TEXT,
    "grade_average" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_schools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_documents" (
    "id" SERIAL NOT NULL,
    "lead_id" INTEGER NOT NULL,
    "document_type" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "is_verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_applications" (
    "id" SERIAL NOT NULL,
    "lead_id" INTEGER NOT NULL,
    "university_program_id" INTEGER NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'applied',
    "applied_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "static_page_seos" (
    "id" SERIAL NOT NULL,
    "page" TEXT NOT NULL,
    "meta_title" TEXT,
    "meta_keyword" TEXT,
    "meta_description" TEXT,
    "og_image_path" TEXT,
    "seo_rating" DECIMAL(2,1),
    "review_number" INTEGER,
    "best_rating" DECIMAL(2,1),
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "static_page_seos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dynamic_page_seos" (
    "id" SERIAL NOT NULL,
    "page" TEXT NOT NULL,
    "meta_title" TEXT,
    "meta_keyword" TEXT,
    "meta_description" TEXT,
    "og_image_path" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dynamic_page_seos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "default_og_images" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image_name" TEXT NOT NULL,
    "image_path" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "default_og_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "website_settings" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT,
    "type" TEXT NOT NULL DEFAULT 'text',
    "group" TEXT NOT NULL DEFAULT 'general',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "website_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faq_categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "faq_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faqs" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "category_id" INTEGER,
    "position" INTEGER NOT NULL DEFAULT 1,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "faqs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "testimonials" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT,
    "description" TEXT,
    "rating" DECIMAL(2,1),
    "image_name" TEXT,
    "image_path" TEXT,
    "video_url" TEXT,
    "position" INTEGER NOT NULL DEFAULT 1,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "testimonials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "galleries" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "image_name" TEXT NOT NULL,
    "image_path" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 1,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "galleries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offices" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT,
    "state" TEXT,
    "country" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "map_embed" TEXT,
    "image_name" TEXT,
    "image_path" TEXT,
    "position" INTEGER NOT NULL DEFAULT 1,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "offices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page_contents" (
    "id" SERIAL NOT NULL,
    "page_slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image_name" TEXT,
    "image_path" TEXT,
    "position" INTEGER NOT NULL DEFAULT 1,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "page_contents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "official_government_links" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT,
    "logo_name" TEXT,
    "logo_path" TEXT,
    "category" TEXT,
    "position" INTEGER NOT NULL DEFAULT 1,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "official_government_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "education_systems" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "introduction_title" TEXT,
    "introduction_description" TEXT,
    "government_regulation" TEXT,
    "cultural_importance" TEXT,
    "continuous_development" TEXT,
    "literacy_rate" DECIMAL(5,2),
    "primary_enrollment" DECIMAL(5,2),
    "secondary_completion" DECIMAL(5,2),
    "higher_institutions_count" INTEGER,
    "school_education_structure_description" TEXT,
    "examination_system_description" TEXT,
    "languages_instruction_description" TEXT,
    "official_state_language" TEXT,
    "official_state_language_percentage" DECIMAL(5,2),
    "official_state_language_note" TEXT,
    "official_language" TEXT,
    "official_language_percentage" DECIMAL(5,2),
    "official_language_note" TEXT,
    "foreign_language" TEXT,
    "foreign_language_percentage" DECIMAL(5,2),
    "foreign_language_note" TEXT,
    "higher_education_description" TEXT,
    "universities_count" INTEGER,
    "universities_note" TEXT,
    "academies_count" INTEGER,
    "academies_note" TEXT,
    "institutes_count" INTEGER,
    "institutes_note" TEXT,
    "bologna_process_alignment" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "education_systems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "education_examinations" (
    "id" SERIAL NOT NULL,
    "exam_name" TEXT NOT NULL,
    "grade_level" TEXT,
    "type" TEXT,
    "subjects" TEXT,
    "page_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "education_examinations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "education_school_levels" (
    "id" SERIAL NOT NULL,
    "level" TEXT NOT NULL,
    "age_range" TEXT,
    "duration_years" INTEGER,
    "is_compulsory" BOOLEAN NOT NULL DEFAULT false,
    "number_of_schools" TEXT,
    "title" TEXT,
    "description" TEXT,
    "page_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "education_school_levels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "education_degrees" (
    "id" SERIAL NOT NULL,
    "degree" TEXT NOT NULL,
    "duration" TEXT,
    "ects_credits" TEXT,
    "recognition" TEXT,
    "page_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "education_degrees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "education_popular_fields" (
    "id" SERIAL NOT NULL,
    "field" TEXT NOT NULL,
    "description" TEXT,
    "number_of_institutions" TEXT,
    "duration_years" TEXT,
    "page_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "education_popular_fields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "about_us" (
    "id" SERIAL NOT NULL,
    "hero_title" TEXT NOT NULL,
    "hero_description" TEXT NOT NULL,
    "button1_label" TEXT,
    "button1_link" TEXT,
    "button2_label" TEXT,
    "button2_link" TEXT,
    "partner_universities" INTEGER,
    "students_placed" INTEGER,
    "channel_partners" INTEGER,
    "years_experience" INTEGER,
    "mission" TEXT,
    "vision" TEXT,
    "why_choose_us" TEXT,
    "service_description" TEXT,
    "university_listings" TEXT,
    "student_counseling" TEXT,
    "admission_assistance" TEXT,
    "international_support" TEXT,
    "partner_with_us" TEXT,
    "partner_benefits" TEXT,
    "why_study_mbbs_title" TEXT,
    "why_study_mbbs_description" TEXT,
    "contact1" TEXT,
    "contact2" TEXT,
    "email1" TEXT,
    "email2" TEXT,
    "address" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "about_us_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "about_country_pages" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT,
    "capital" TEXT,
    "population" TEXT,
    "languages" TEXT,
    "currency" TEXT,
    "location" TEXT,
    "timezone" TEXT,
    "independence_day" DATE,
    "highest_peak" TEXT,
    "highest_peak_height" TEXT,
    "mountain_ranges" JSONB,
    "climate_zones" JSONB,
    "top_attractions" JSONB,
    "ancient_silk_road" TEXT,
    "nomadic_heritage" TEXT,
    "religion_diversity" TEXT,
    "cultural_highlights" TEXT,
    "who_recognized" BOOLEAN NOT NULL DEFAULT false,
    "mbbs_affordable_education" TEXT,
    "english_medium" BOOLEAN NOT NULL DEFAULT false,
    "academic_excellence" TEXT,
    "student_life" TEXT,
    "key_sectors" TEXT,
    "major_exports" TEXT,
    "investment_opportunities" TEXT,
    "gdp_growth" TEXT,
    "main_industries" TEXT,
    "tourism_growth" TEXT,
    "hydropower_potential" TEXT,
    "transportation" JSONB,
    "visa_connectivity" TEXT,
    "public_healthcare" TEXT,
    "private_healthcare" TEXT,
    "student_healthcare" TEXT,
    "national_sport" TEXT,
    "unesco_sites" TEXT,
    "banner_image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "about_country_pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "country_cuisine_lifestyles" (
    "id" SERIAL NOT NULL,
    "dish_name" TEXT,
    "dish_description" TEXT,
    "dish_image" TEXT,
    "icon_class" TEXT,
    "page_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "country_cuisine_lifestyles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "country_lifestyle_cultures" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "icon_class" TEXT,
    "image" TEXT,
    "page_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "country_lifestyle_cultures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "country_major_cities" (
    "id" SERIAL NOT NULL,
    "city_name" TEXT NOT NULL,
    "description" TEXT,
    "population" TEXT,
    "highlights" TEXT,
    "city_image" TEXT,
    "page_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "country_major_cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "country_tourist_attractions" (
    "id" SERIAL NOT NULL,
    "attraction_name" TEXT NOT NULL,
    "description" TEXT,
    "ordering" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "image" TEXT,
    "icon_class" TEXT,
    "page_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "country_tourist_attractions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "study_modes" (
    "id" SERIAL NOT NULL,
    "study_mode" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "study_modes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expert_teams" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT,
    "description" TEXT,
    "photo_name" TEXT,
    "photo_path" TEXT,
    "linkedin_url" TEXT,
    "position" INTEGER NOT NULL DEFAULT 1,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expert_teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "education_system_pages" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT,
    "highlights" JSONB,
    "icon_class" TEXT,
    "position" INTEGER NOT NULL DEFAULT 1,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "education_system_pages_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "levels_slug_key" ON "levels"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "hospitals_slug_key" ON "hospitals"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "universities_slug_key" ON "universities"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "scholarships_slug_key" ON "scholarships"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "blog_categories_slug_key" ON "blog_categories"("slug");

-- CreateIndex
CREATE INDEX "blog_contents_blog_id_idx" ON "blog_contents"("blog_id");

-- CreateIndex
CREATE UNIQUE INDEX "news_categories_slug_key" ON "news_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "article_categories_slug_key" ON "article_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "leads_email_key" ON "leads"("email");

-- CreateIndex
CREATE UNIQUE INDEX "leads_phone_key" ON "leads"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "static_page_seos_page_key" ON "static_page_seos"("page");

-- CreateIndex
CREATE UNIQUE INDEX "dynamic_page_seos_page_key" ON "dynamic_page_seos"("page");

-- CreateIndex
CREATE UNIQUE INDEX "website_settings_key_key" ON "website_settings"("key");

-- CreateIndex
CREATE UNIQUE INDEX "faq_categories_slug_key" ON "faq_categories"("slug");

-- AddForeignKey
ALTER TABLE "cities" ADD CONSTRAINT "cities_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "provinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "universities" ADD CONSTRAINT "universities_institute_type_id_fkey" FOREIGN KEY ("institute_type_id") REFERENCES "institute_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "universities" ADD CONSTRAINT "universities_province_id_fkey" FOREIGN KEY ("province_id") REFERENCES "provinces"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "universities" ADD CONSTRAINT "universities_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "cities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "university_programs" ADD CONSTRAINT "university_programs_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "universities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "university_programs" ADD CONSTRAINT "university_programs_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "levels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "university_photos" ADD CONSTRAINT "university_photos_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "universities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "university_rankings" ADD CONSTRAINT "university_rankings_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "universities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "university_students" ADD CONSTRAINT "university_students_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "universities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "university_fmge_rates" ADD CONSTRAINT "university_fmge_rates_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "universities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "university_intakes" ADD CONSTRAINT "university_intakes_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "universities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "university_testimonials" ADD CONSTRAINT "university_testimonials_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "universities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "university_reviews" ADD CONSTRAINT "university_reviews_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "universities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "university_faqs" ADD CONSTRAINT "university_faqs_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "universities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "university_facilities" ADD CONSTRAINT "university_facilities_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "universities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "university_facilities" ADD CONSTRAINT "university_facilities_facility_id_fkey" FOREIGN KEY ("facility_id") REFERENCES "facilities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "university_hospitals" ADD CONSTRAINT "university_hospitals_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "universities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "university_hospitals" ADD CONSTRAINT "university_hospitals_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "hospitals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "university_links" ADD CONSTRAINT "university_links_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "universities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scholarships" ADD CONSTRAINT "scholarships_university_id_fkey" FOREIGN KEY ("university_id") REFERENCES "universities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scholarship_faqs" ADD CONSTRAINT "scholarship_faqs_scholarship_id_fkey" FOREIGN KEY ("scholarship_id") REFERENCES "scholarships"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "blog_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_contents" ADD CONSTRAINT "blog_contents_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_contents" ADD CONSTRAINT "blog_contents_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "blog_contents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blog_faqs" ADD CONSTRAINT "blog_faqs_blog_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "blogs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "news_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_contents" ADD CONSTRAINT "news_contents_news_id_fkey" FOREIGN KEY ("news_id") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_contents" ADD CONSTRAINT "news_contents_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "news_contents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "news_faqs" ADD CONSTRAINT "news_faqs_news_id_fkey" FOREIGN KEY ("news_id") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "article_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "articles" ADD CONSTRAINT "articles_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_contents" ADD CONSTRAINT "article_contents_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_contents" ADD CONSTRAINT "article_contents_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "article_contents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article_faqs" ADD CONSTRAINT "article_faqs_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lead_inquiries" ADD CONSTRAINT "lead_inquiries_agent_id_fkey" FOREIGN KEY ("agent_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "lead_inquiries" ADD CONSTRAINT "lead_inquiries_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_schools" ADD CONSTRAINT "student_schools_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_documents" ADD CONSTRAINT "student_documents_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_applications" ADD CONSTRAINT "student_applications_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_applications" ADD CONSTRAINT "student_applications_university_program_id_fkey" FOREIGN KEY ("university_program_id") REFERENCES "university_programs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "faqs" ADD CONSTRAINT "faqs_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "faq_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "education_examinations" ADD CONSTRAINT "education_examinations_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "education_systems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "education_school_levels" ADD CONSTRAINT "education_school_levels_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "education_systems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "education_degrees" ADD CONSTRAINT "education_degrees_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "education_systems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "education_popular_fields" ADD CONSTRAINT "education_popular_fields_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "education_systems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "country_cuisine_lifestyles" ADD CONSTRAINT "country_cuisine_lifestyles_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "about_country_pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "country_lifestyle_cultures" ADD CONSTRAINT "country_lifestyle_cultures_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "about_country_pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "country_major_cities" ADD CONSTRAINT "country_major_cities_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "about_country_pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "country_tourist_attractions" ADD CONSTRAINT "country_tourist_attractions_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "about_country_pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

