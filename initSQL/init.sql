-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "User_no_seq";

-- Table Definition
CREATE TABLE "public"."Users" (
    "no" int4 NOT NULL DEFAULT nextval('"User_no_seq"'::regclass),
    "userId" varchar(255) NOT NULL,
    "userName" varchar(255) NOT NULL,
    "email" varchar(255) NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    "password" varchar(255) NOT NULL,
    PRIMARY KEY ("userId")
);
-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "Tasks_no_seq";
DROP TYPE IF EXISTS "public"."status_enum";
CREATE TYPE "public"."status_enum" AS ENUM ('To Do', 'In Progress', 'Done');

-- Table Definition
CREATE TABLE "public"."Tasks" (
    "no" int4 NOT NULL DEFAULT nextval('"Tasks_no_seq"'::regclass),
    "taskId" varchar(255) NOT NULL,
    "ownerId" varchar(255) NOT NULL,
    "status" "public"."status_enum" NOT NULL,
    "title" varchar(255) NOT NULL,
    "description" text NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    "isKeep" bool NOT NULL DEFAULT false,
    CONSTRAINT "Tasks_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    PRIMARY KEY ("taskId")
);
-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "Comments_no_seq";

-- Table Definition
CREATE TABLE "public"."Comments" (
    "no" int4 NOT NULL DEFAULT nextval('"Comments_no_seq"'::regclass),
    "commentId" varchar(255) NOT NULL,
    "ownerId" varchar(255) NOT NULL,
    "content" text NOT NULL,
    "createdAt" timestamptz NOT NULL,
    "updatedAt" timestamptz NOT NULL,
    "taskId" varchar(255) NOT NULL,
    CONSTRAINT "Comments_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "public"."Tasks"("taskId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comments_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "public"."Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    PRIMARY KEY ("commentId")
);

INSERT INTO "public"."Users" ("no", "userId", "userName", "email", "createdAt", "updatedAt", "password") VALUES
(2, 'c28db69a-aee6-43e0-a93a-add423560c99', 'โรบินฮูด', 'user1@robinhood.co.th', '2023-06-09 13:06:09.028+00', '2023-06-09 13:06:09.028+00', '$2b$04$FoyMdGO7mJXgQ7iR53zTL.hx8OaC6ooyYuV/333bYslXcQpVfa1Ty');


INSERT INTO "public"."Tasks" ("no", "taskId", "ownerId", "status", "title", "description", "createdAt", "updatedAt", "isKeep") VALUES
(11, '4ce73d43-06cf-423c-b483-09dda5baf87e', 'c28db69a-aee6-43e0-a93a-add423560c99', 'Done', 'นัดสัมภาษงาน', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum convallis ligula sit amet hendrerit efficitur. Fusce tristique vitae ligula vulputate lacinia. Donec sed massa aliquet, molestie diam eget, facilisis odio. In iaculis nisi massa, id fringilla arcu iaculis in. Vestibulum est eros, sagittis eu dignissim quis, rhoncus sit amet odio. Sed justo quam, dignissim at ante quis, tempus tempus magna. Nullam a tempor libero. Donec at sem condimentum, luctus diam in, porta mauris. Integer erat est, gravida ac mi a, scelerisque ornare ex. Vestibulum ut mauris vitae metus interdum varius at nec quam. Donec sed tempus leo, vel tristique magna. Proin vitae ligula sapien.', '2023-06-11 08:31:02.078+00', '2023-06-11 08:43:24.08+00', 'f'),
(12, '673722de-c04a-4cba-91ff-050e9a2adc54', 'c28db69a-aee6-43e0-a93a-add423560c99', 'Done', 'นัดสัมภาษงาน', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum convallis ligula sit amet hendrerit efficitur. Fusce tristique vitae ligula vulputate lacinia. Donec sed massa aliquet, molestie diam eget, facilisis odio. In iaculis nisi massa, id fringilla arcu iaculis in. Vestibulum est eros, sagittis eu dignissim quis, rhoncus sit amet odio. Sed justo quam, dignissim at ante quis, tempus tempus magna. Nullam a tempor libero. Donec at sem condimentum, luctus diam in, porta mauris. Integer erat est, gravida ac mi a, scelerisque ornare ex. Vestibulum ut mauris vitae metus interdum varius at nec quam. Donec sed tempus leo, vel tristique magna. Proin vitae ligula sapien.', '2023-06-11 08:52:12.327+00', '2023-06-11 08:54:46.156+00', 'f'),
(9, 'b9b45fec-f8b5-47e1-891f-54a33d4ad9e9', 'c28db69a-aee6-43e0-a93a-add423560c99', 'Done', 'นัดสัมภาษงาน', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum convallis ligula sit amet hendrerit efficitur. Fusce tristique vitae ligula vulputate lacinia. Donec sed massa aliquet, molestie diam eget, facilisis odio. In iaculis nisi massa, id fringilla arcu iaculis in. Vestibulum est eros, sagittis eu dignissim quis, rhoncus sit amet odio. Sed justo quam, dignissim at ante quis, tempus tempus magna. Nullam a tempor libero. Donec at sem condimentum, luctus diam in, porta mauris. Integer erat est, gravida ac mi a, scelerisque ornare ex. Vestibulum ut mauris vitae metus interdum varius at nec quam. Donec sed tempus leo, vel tristique magna. Proin vitae ligula sapien.', '2023-06-09 13:41:00.044+00', '2023-06-11 08:30:54.883+00', 't');

INSERT INTO "public"."Comments" ("no", "commentId", "ownerId", "content", "createdAt", "updatedAt", "taskId") VALUES
(17, '0636acdd-8f03-4d5d-92c3-ac925fc7fefe', 'c28db69a-aee6-43e0-a93a-add423560c99', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum convallis ligula sit amet hendrerit efficitur.', '2023-06-11 08:54:59.697+00', '2023-06-11 08:54:59.697+00', '673722de-c04a-4cba-91ff-050e9a2adc54'),
(10, '2c66aa75-6b03-43f2-ad3f-4ce20a85dede', 'c28db69a-aee6-43e0-a93a-add423560c99', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum convallis ligula sit amet hendrerit efficitur.', '2023-06-11 08:43:30.572+00', '2023-06-11 08:43:30.572+00', '4ce73d43-06cf-423c-b483-09dda5baf87e'),
(7, '68da39b5-cda0-412a-8abc-58e331e36b71', 'c28db69a-aee6-43e0-a93a-add423560c99', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum convallis ligula sit amet hendrerit efficitur.', '2023-06-11 08:26:42.869+00', '2023-06-11 08:26:42.869+00', 'b9b45fec-f8b5-47e1-891f-54a33d4ad9e9'),
(9, '6df678b4-dd65-464c-bf8c-0d3055cd6c53', 'c28db69a-aee6-43e0-a93a-add423560c99', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum convallis ligula sit amet hendrerit efficitur.', '2023-06-11 08:29:53.474+00', '2023-06-11 08:29:53.474+00', 'b9b45fec-f8b5-47e1-891f-54a33d4ad9e9'),
(6, 'a877561e-cee4-417a-b7c2-0ee45aee5d7b', 'c28db69a-aee6-43e0-a93a-add423560c99', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum convallis ligula sit amet hendrerit efficitur.', '2023-06-11 08:26:41.202+00', '2023-06-11 08:26:41.202+00', 'b9b45fec-f8b5-47e1-891f-54a33d4ad9e9'),
(8, 'b361debc-0a79-46e1-a046-cddb7affc8e7', 'c28db69a-aee6-43e0-a93a-add423560c99', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum convallis ligula sit amet hendrerit efficitur.', '2023-06-11 08:26:43.451+00', '2023-06-11 08:26:43.451+00', 'b9b45fec-f8b5-47e1-891f-54a33d4ad9e9');