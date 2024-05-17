import random

datetimes = [
    "2021-07-13 12:45:36", "2021-06-28 05:52:19", "2021-10-04 23:21:08", "2022-05-19 16:30:11", "2023-02-26 03:14:35",
    "2021-09-18 09:02:57", "2023-01-11 18:48:13", "2021-11-22 07:45:27", "2023-04-14 12:53:40", "2022-08-09 20:18:03",
    "2022-03-02 21:25:42", "2021-04-15 10:09:17", "2022-07-05 04:17:59", "2022-11-23 13:46:32", "2022-05-30 08:28:46",
    "2021-02-10 11:39:56", "2023-05-01 15:06:48", "2021-12-08 22:15:33", "2021-05-06 06:43:29", "2022-09-21 17:34:27",
    "2023-03-19 23:57:59", "2022-12-17 09:02:12", "2021-06-10 19:32:23", "2021-08-25 03:11:38", "2023-03-28 08:24:56",
    "2021-11-10 14:39:43", "2022-01-29 11:08:04", "2022-10-30 22:20:47", "2022-06-03 07:47:52", "2021-07-27 20:34:55",
    "2023-01-22 16:53:01", "2021-04-22 23:11:20", "2022-08-18 18:28:14", "2023-02-13 05:07:08", "2021-03-07 15:40:50",
    "2022-03-29 06:59:16", "2022-11-11 02:04:21", "2022-06-26 10:55:37", "2021-09-03 12:13:49", "2023-03-06 04:48:51",
    "2022-01-12 19:15:44", "2022-09-04 22:36:20", "2022-05-09 05:26:15", "2021-07-19 09:31:04", "2023-04-08 17:40:22",
    "2021-02-24 20:53:07", "2021-10-16 07:45:54", "2022-07-14 14:12:39", "2023-02-01 08:21:16", "2021-11-29 16:37:45",
    "2022-04-04 12:06:02", "2022-10-03 18:55:32", "2023-01-02 23:40:50", "2021-08-12 05:48:36", "2023-03-23 13:22:31",
    "2021-05-18 11:32:59", "2022-02-25 02:41:28", "2022-09-15 06:15:39", "2022-06-15 20:51:03", "2021-04-10 18:08:27",
    "2023-04-26 09:45:54", "2021-09-27 04:18:05", "2022-07-29 07:29:43", "2022-11-02 15:33:16", "2022-03-11 22:45:59",
    "2021-06-01 10:29:40", "2023-02-22 20:08:45", "2021-12-18 03:05:28", "2022-04-25 09:14:32", "2022-10-19 19:37:17",
    "2021-08-30 16:48:02", "2023-01-15 11:53:18", "2021-03-16 21:06:51", "2022-02-07 06:24:10", "2022-08-23 11:15:38",
    "2021-05-11 13:58:46", "2023-04-03 02:27:09", "2022-01-21 12:44:07", "2021-07-02 08:34:29", "2022-12-03 04:47:51",
    "2021-10-08 17:39:34", "2022-06-21 03:56:59", "2023-03-14 10:29:37", "2021-12-29 01:22:44", "2021-08-03 22:19:53",
    "2022-04-15 15:53:25", "2022-11-30 18:03:48", "2022-05-26 07:40:55"
]

objects = [
    (datetimes[i], "", "", "", f"client/photos/animal_pic_{str(i+1).zfill(3)}.jpg", random.randint(1, 10)) 
    for i in range(88)
]

# Print the objects
for obj in objects:
    print(obj)